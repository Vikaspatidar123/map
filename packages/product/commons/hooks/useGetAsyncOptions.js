import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useDebounceQuery from './useDebounceQuery';
import useLocalStorage from './useLocalStorage';
import useRequest from './useRequest';

function useGetAsyncOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	modifiedOptions = (a) => a,
	defaultOnChange,
	createHistoryEndpoint = '',
	source = '',
}) {
	const [storeOptions, setStoreOptions] = useState([]);
	const { query, debounceQuery } = useDebounceQuery();
	const { isLogged } = useSelector(({ profile }) => profile);
	const [history, setHistory] = useLocalStorage(`${source}-history`, []);

	const finalParams = merge(params, { filters: { q: query || undefined } });

	const filteredHistory = finalParams?.type
		? history.filter(({ type }) => [finalParams.filters.type].flat().includes(type))
		: history;

	const [{ data, loading }] = useRequest({
		url    : endpoint,
		method : 'GET',
		params : finalParams,
	}, { manual: !(initialCall || query) });

	const [, trigger] = useRequest(
		{ url: createHistoryEndpoint, method: 'POST' },
		{ manual: true },
	);

	const options = modifiedOptions(data?.list || filteredHistory);
	const dependency = (options).map(({ id }) => id).join('');

	useEffect(() => {
		if (options.length > 0) {
			setStoreOptions([...options]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency]);
	const [{ loading: loadingSingle }, triggerSingle] = useRequest({
		url    : endpoint,
		method : 'GET',
	}, { manual: true });

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		const checkOptionsExist = options.filter((item) => item[valueKey] === value);

		if (checkOptionsExist.length > 0) return checkOptionsExist[0];

		try {
			const res = await triggerSingle({
				params: merge(params, { filters: { [valueKey]: value } }),
			});
			const list = res?.data?.list || [];
			if (list.length > 0) {
				setStoreOptions([...storeOptions, ...modifiedOptions(list)]);
			}
			return modifiedOptions(list)?.[0] || null;
		} catch (err) {
			return {};
		}
	};

	const createHistory = async (selectedOption) => {
		try {
			const payload = {
				source,
				selected_location: {
					name : query,
					id   : selectedOption,
				},
			};
			await trigger({ data: payload });
		} catch (err) {
			// console.log(err);
		}
	};

	const onChange = (val, ...args) => {
		if (createHistoryEndpoint && val && isLogged) {
			createHistory(val);
			const { pos, display_pos, label, ...rest } = args[0];
			const newHistory = [{ ...rest, history: true }, ...filteredHistory].slice(0, 10);
			setHistory(Object.values(newHistory.reduce(
				(acc, obj) => {
					acc[obj.id] = obj;
					return acc;
				},
				{},
			)));
		}
		defaultOnChange(val, ...args);
	};

	return {
		loading : loading || loadingSingle,
		onSearch,
		onChange,
		options : storeOptions,
		labelKey,
		valueKey,
		onHydrateValue,
	};
}

export default useGetAsyncOptions;

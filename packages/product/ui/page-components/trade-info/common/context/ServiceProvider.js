import React, { useMemo, useState } from 'react';

export const ServiceContext = React.createContext();

function ServiceProvider({ children, locationData }) {
	const [activeTab, setActiveTab] = useState('');
	const [activePort, setActivePort] = useState(null);

	const value = useMemo(() => ({
		activeTab,
		setActiveTab,
		locationData,
		activePort,
		setActivePort,
	}), [activeTab, locationData, activePort]);

	return (
		<ServiceContext.Provider value={value}>
			{children}
		</ServiceContext.Provider>
	);
}

export default ServiceProvider;

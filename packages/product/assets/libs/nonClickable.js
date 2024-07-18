/* eslint-disable */ 

L.Layer.include({

	setInteractive(interactive) {
		if (this.getLayers) {
			this.getLayers().forEach((layer) => {
				layer.setInteractive(interactive);
			});
			return;
		}

		if (interactive) {
			L.DomUtil.addClass(this.getElement(), 'leaflet-interactive');
		} else {
			L.DomUtil.removeClass(this.getElement(), 'leaflet-interactive');
		}
	},

});

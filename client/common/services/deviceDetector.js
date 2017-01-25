function DeviceDetector() {}
DeviceDetector.prototype.isTablet = () => window.innerWidth <= 1024;
const deviceDetector = new DeviceDetector();

export default deviceDetector;

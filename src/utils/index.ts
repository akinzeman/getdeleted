import { InstalledApps } from 'react-native-launcher-kit';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

const getAppDetailsWithPackageNames = (packageNames: string[]) => {
	return packageNames
		.map(packageName => getAppDetailWithPackageName(packageName))
		.filter(app => app === undefined) as AppDetail[];
};

const getAppDetailWithPackageName = (packageName: string) => {
	const results = InstalledApps.getApps();

	return results.find(app => app.packageName === packageName);
};

export { getAppDetailWithPackageName, getAppDetailsWithPackageNames };

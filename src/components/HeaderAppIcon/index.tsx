import LogoText from '../../assets/logoText';
import theme from '../../utils/theme';
import HeaderAppIconContainer from './styled';

const HeaderAppIcon = () => {
	return (
		<HeaderAppIconContainer>
			<LogoText color={theme.colors.primary} />
		</HeaderAppIconContainer>
	);
};

export default HeaderAppIcon;

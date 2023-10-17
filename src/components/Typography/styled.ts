import { Text } from 'react-native';
import { styled } from 'styled-components';

interface TextProps {
	color?: string;
	underline: boolean;
}

const Default = styled(Text)<TextProps>`
	font-size: 14px;
	color: ${({ color, theme }) => color || theme.colors.black};
	text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const H2 = styled(Text)<TextProps>`
	font-size: 20px;
	font-weight: 600;
	color: ${({ color, theme }) => color || theme.colors.black};
	text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const H3 = styled(Text)<TextProps>`
	font-size: 18px;
	font-weight: 600;
	color: ${({ color, theme }) => color || theme.colors.black};
	text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const H4 = styled(Text)<TextProps>`
	font-size: 16px;
	font-weight: 600;
	color: ${({ color, theme }) => color || theme.colors.black};
	text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const H5 = styled(Text)<TextProps>`
	font-size: 14px;
	font-weight: 600;
	color: ${({ color, theme }) => color || theme.colors.black};
	text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const Caption = styled(Text)<TextProps>`
	font-size: 9px;
	font-weight: 400;
	color: ${({ color, theme }) => color || theme.colors.gray};
	text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const Subtitle2 = styled(Text)<TextProps>`
	font-size: 10px;
	font-weight: 400;
	color: ${({ color, theme }) => color || theme.colors.gray};
	text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

export { Default, H2, H3, H4, H5, Caption, Subtitle2 };

import React from 'react';
import { View } from 'react-native';
import { Wallet, CheckSquareOffset, Globe, ClipboardText } from 'phosphor-react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";

interface ProgressIndicatorProps {
    status: 'initial' | 'partial' | 'complete';
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ status }) => {
    let ellipse1Color, lineColor, ellipse2Color;

    switch (status) {
        case 'initial':
            ellipse1Color = '#008EDE';
            lineColor = '#C5C5C5';
            ellipse2Color = '#C5C5C5';
            break;
        case 'partial':
            ellipse1Color = '#0EB500';
            lineColor = '#0EB500';
            ellipse2Color = '#008EDE';
            break;
        case 'complete':
            ellipse1Color = '#0EB500';
            lineColor = '#0EB500';
            ellipse2Color = '#0EB500';
            break;
        default:
            ellipse1Color = '#008EDE';
            lineColor = '#C5C5C5';
            ellipse2Color = '#C5C5C5';
    }

    return (
        <View style={[globalStyles.alignItemsCenter]}>
            <View style={[globalStyles.flexRow, globalStyles.flexCenter, globalStyles.w50]}>
                <View style={[styles.ellipse, { borderColor: ellipse1Color }]}>
                    <Wallet color={ellipse1Color} size={24} weight="fill" />
                </View>
                <View style={[styles.line, { backgroundColor: lineColor }]} />
                <View style={[styles.ellipse, { borderColor: ellipse2Color }]}>
                    <ClipboardText color={ellipse2Color} size={24} weight="fill" />
                </View>
            </View>
        </View>
    );
};

export default ProgressIndicator;
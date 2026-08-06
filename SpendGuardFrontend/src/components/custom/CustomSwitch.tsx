// components/custom/CustomSwitch.tsx

import React from 'react';
import {
    Switch,
    SwitchProps,
} from 'react-native';
import { useAppSelector } from '../../hooks/storeHooks';

interface CustomSwitchProps extends SwitchProps { }

const CustomSwitch = ({
    value,
    onValueChange,
    disabled = false,
    ...props
}: CustomSwitchProps) => {
    const COLORS = useAppSelector(state => state.theme.colors);

    return (
        <Switch
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
            trackColor={{
                false: COLORS.switchTrackInactive,
                true: COLORS.switchTrackActive,
            }}
            thumbColor={
                value
                    ? COLORS.switchThumbActive
                    : COLORS.switchThumbInactive
            }
            ios_backgroundColor={COLORS.switchTrackInactive}
            {...props}
        />
    );
};

export default CustomSwitch;
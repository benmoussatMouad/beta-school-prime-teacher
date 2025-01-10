import { forwardRef } from "react";
import PropTypes from "prop-types";
import VuiDatePickerRoot from "./VuiDatePickerRoot";
import { useVisionUIController } from "context";

const VuiDatePicker = forwardRef(({ size, icon, error, success, disabled, ...rest }, ref) => {
    const [controller] = useVisionUIController();
    const { direction } = controller;

    return (
        <VuiDatePickerRoot
            {...rest}
            ref={ref}
            ownerState={{ size, error, success, direction, disabled }}
        />
    );
});

VuiDatePicker.defaultProps = {
    size: "medium",
    error: false,
    success: false,
    disabled: false,
};

VuiDatePicker.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    error: PropTypes.bool,
    success: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default VuiDatePicker;
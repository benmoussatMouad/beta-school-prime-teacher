import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";

export default styled(DatePicker)(({ theme, ownerState }) => {
    const { palette, functions, borders } = theme;
    const { disabled } = ownerState;

    const { inputColors, white, grey } = palette;
    const { pxToRem, boxShadow } = functions;
    const { borderRadius } = borders;

    return {
        width: "100%",
        "& .MuiFormLabel-root.MuiInputLabel-root": {
            color: `${white.main} !important`,
            fontSize: "0.875rem",
            transform: "translate(14px, 10px) scale(0.75)",


            "&.MuiInputLabel-shrink": {
                transform: "translate(14px, -15px) scale(0.75)",
            }
        },

        "& .MuiInputBase-root": {
            pointerEvents: disabled ? "none" : "auto",
            backgroundColor: `${disabled ? grey[600] : inputColors.backgroundColor} !important`,
            color: `${white.main} !important`,
            borderRadius: `${borderRadius.lg} !important`,
            border: `0.5px solid ${grey[600]}`,
            padding: `${pxToRem(8)} ${pxToRem(12)}`,
            fontSize: "0.875rem",
            width: "100%",


            "& .MuiInputBase-input": {
                color: `${white.main} !important`,
                fontSize: "0.875rem !important",
                width: "100% !important",
            },

            "& .MuiSvgIcon-root": {
                color: `${white.main} !important`,
            },

            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: `${white.main} !important`,
                borderWidth: "1px !important"
            },

            "&.Mui-focused": {
                borderColor: inputColors.borderColor.focus,
                boxShadow: boxShadow([0, 0], [0, 2], inputColors.boxShadow, 1),
                outline: 0,
            },

            "& ::placeholder": {
                color: `${white.main} !important`,
                fontSize: "12px",
            }
        },
    };
});
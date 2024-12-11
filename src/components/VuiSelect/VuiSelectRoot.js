import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledSelect = styled(Select)(({ theme, ownerState }) => {
  const { palette, boxShadows, functions, typography, borders } = theme;
  const { size, error, success, disabled } = ownerState;

  const { inputColors, white, grey } = palette;
  const { inputBoxShadow } = boxShadows;
  const { pxToRem, boxShadow } = functions;
  const { size: fontSize } = typography;
  const { borderRadius } = borders;

  // Border color value
  let borderColorValue = error ? inputColors.error : success ? inputColors.success : grey[600];

  // Styles for different sizes
  const smallStyles = () => ({
    fontSize: fontSize.xs,
    padding: `${pxToRem(4)} ${pxToRem(12)}`,
  });

  const mediumStyles = () => ({
    padding: `${pxToRem(8)} ${pxToRem(12)}`,
  });

  const largeStyles = () => ({
    padding: pxToRem(12),
  });

  // Focused styles
  const focusedBorderColorValue = error ? inputColors.error : success ? inputColors.success : inputColors.borderColor.focus;
  const focusedBoxShadowValue = error
    ? inputBoxShadow.error
    : success
      ? inputBoxShadow.success
      : boxShadow([0, 0], [0, 2], inputColors.boxShadow, 1);

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : `${inputColors.backgroundColor} !important`,
    pointerEvents: disabled ? "none" : "auto",
    color: `${white.main} !important`,
    borderRadius: `${borderRadius.lg} !important`,
    border: `0.5px solid ${borderColorValue}`,
    ...(size === "small" && smallStyles()),
    ...(size === "medium" && mediumStyles()),
    ...(size === "large" && largeStyles()),
    padding: "8px 0px !important",
    "& .MuiSelect-icon": {
      color: white.main, // Adjust the icon color
    },

    "&.Mui-focused": {
      borderColor: focusedBorderColorValue,
      boxShadow: focusedBoxShadowValue,
      outline: 0,
    },

    "& .MuiOutlinedInput-input": {
      width: "100% !important",
    },

    "& ::placeholder": {
      color: `${white.main} !important`,
      fontSize: "12px",
    },
  };
});

export default StyledSelect;

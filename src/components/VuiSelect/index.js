/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { forwardRef } from "react";
import { FormControl, MenuItem } from "@mui/material";
import StyledSelect from "./VuiSelectRoot";
import { useTranslation } from "react-i18next";


const VuiSelect = forwardRef((
  {
    t: subject = true,
    variant,
    color,
    value,
    label,
    onChange,
    options,
    ...rest
  }, ref) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth>
      {/* Use dynamic label */}
      <StyledSelect
        labelId="vui-select-label"
        id="vui-select"
        value={value}
        label={label}
        onChange={onChange}
        ref={ref}
        {...rest}
        ownerState={{
          size: "medium",
          error: false,
          success: false,
          direction: "ltr",
          iconDirection: "left",
        }}
      >
        {options.map((value, index) => (
          <MenuItem key={index} value={value}>
            {subject ? t(`subjects.${value}`) : t(`teacherClass.${value}`)}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
});


export default VuiSelect;

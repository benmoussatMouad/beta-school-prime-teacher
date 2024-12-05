import { Icon, IconButton } from "@mui/material"
import VuiTypography from "components/VuiTypography"
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useTranslation } from "react-i18next";

function Translator() {

    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "ar" ? "fr" : "ar";
        localStorage.setItem('language', newLang);
        i18n.changeLanguage(newLang);
    };

  return (
    <IconButton style={{ position: "absolute", top: 10, [i18n.language === "ar" ? "left" : "right"]: 0 }}
                onClick={toggleLanguage} sx={navbarIconButton} size="small">
      <VuiTypography
        variant="button"
        fontWeight="medium"
      >
        {i18n.language === "fr" ? "العربية" : "Français"}
      </VuiTypography>
      <Icon
        style={{ [i18n.language === "ar" ? "marginRight" : "marginLeft"]: "10px" }}
      >
        language
      </Icon>
    </IconButton>
  );
}

export default Translator

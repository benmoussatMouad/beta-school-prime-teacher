import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/auth/authContext";
import VuiInput from "../../components/VuiInput";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box } from "@mui/material";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import { useSubmitSupport } from "api/teacher/submitSupport";

function Support() {
  const language = localStorage.getItem("language");
  const { user } = useAuth();
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});
  const { mutate, isLoading } = useSubmitSupport();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    message: "",
    subject: ""
  });

  const validateForm = () => {
    const newErrors = {};
    const MAX_MESSAGE_LENGTH = 1500;

    if (!formData.email) newErrors.email = t('forms.required.email');
    if (!formData.fullName) newErrors.fullName = t('forms.required.fullName');
    if (!formData.subject) newErrors.subject = t('forms.required.subject');
    if (!formData.message) {
      newErrors.message = t('forms.required.message');
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = t('forms.validation.messageTooLong', { max: MAX_MESSAGE_LENGTH });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      mutate(formData);
    }
  };

  const contactNumbers = ["+213 791 94 16 12"];

  const faqs = [
    {
      question: t("faq.1.question"),
      answer: t("faq.1.answer"),
    },
    {
      question: t("faq.2.question"),
      answer: t("faq.2.answer"),
    },
    {
      question: t("faq.3.question"),
      answer: t("faq.3.answer"),
    },
    {
      question: t("faq.4.question"),
      answer: t("faq.4.answer"),
    },
    {
      question: t("faq.5.question"),
      answer: t("faq.5.answer"),
    },
    {
      question: t("faq.6.question"),
      answer: t("faq.6.answer"),
    },
    {
      question: t("faq.7.question"),
      answer: t("faq.7.answer"),
    },
    {
      question: t("faq.8.question"),
      answer: t("faq.8.answer"),
    },
    {
      question: t("faq.9.question"),
      answer: t("faq.9.answer"),
    },
    {
      question: t("faq.10.question"),
      answer: t("faq.10.answer"),
    },
    {
      question: t("faq.11.question"),
      answer: t("faq.11.answer"),
    },
    {
      question: t("faq.12.question"),
      answer: t("faq.12.answer"),
    },
  ];

  const formatPhoneNumber = (num) => {
    // Remove any non-digit characters
    const cleaned = num.replace(/\D/g, '');

    // Group the numbers (2-2-2-2-3)
    const matched = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})$/);

    if (matched) {
      return `${matched[1]} ${matched[2]} ${matched[3]} ${matched[4]} ${matched[5]}`;
    }

    return num;
  };

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Tableau de bord"} />
      <Grid container>
        <Grid xs={12} lg={6} item p={2}>
          <Card>
            {/* Contact Information */}
            <VuiBox p="5px">
              <VuiTypography sx={{ marginBottom: "10px" }} color="white" variant="lg" fontWeight="bold">
                {t("support.contactNumbers.title")}
              </VuiTypography>

              <Grid container spacing={3}>
                {/* Phone Numbers */}
                <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }} sm={6}>
                  <VuiTypography color="white" variant="md" fontWeight="bold" mb="8px">
                    {t("support.contactNumbers.phone")}
                  </VuiTypography>
                  {contactNumbers.map((number, index) => (
                    <div
                      key={index}
                      style={{
                        textAlign: language === 'ar' ? "right" : "left",
                        direction: language === 'ar' ? 'rtl' : 'ltr',
                        fontSize: '1rem',
                        color: "white",
                        width: '100%',
                      }}
                    >
                      <span style={{
                        unicodeBidi: 'plaintext',
                        whiteSpace: 'nowrap'
                      }}>
                        {formatPhoneNumber(number)}
                      </span>
                    </div>
                  ))}
                </Grid>

                {/* Email Addresses */}
                <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }} sm={6}>
                  <VuiTypography color="white" variant="md" fontWeight="bold" mb="8px">
                    {t("support.contactNumbers.email")}
                  </VuiTypography>
                  {["contact@betaschoolprime.com"].map((email, index) => (
                    <VuiTypography
                      color="text"
                      variant="button"
                      fontWeight="regular"
                      key={index}
                      mb="4px"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {email}
                    </VuiTypography>
                  ))}
                </Grid>

                {/* Office Address */}
                <Grid item sx={{ display: "flex", flexDirection: "column" }} xs={12}>
                  <VuiTypography color="white" variant="md" fontWeight="bold" mb="8px">
                    {t("support.contactNumbers.address")}
                  </VuiTypography>
                  <VuiTypography color="text" variant="button" fontWeight="regular" mb="4px">
                    PC6M+58G, Bir El Djir, Algeria
                  </VuiTypography>
                  <VuiTypography color="text" variant="button" fontWeight="regular">
                    ORAN, 31000
                  </VuiTypography>
                </Grid>

                {/* Social Media Links */}
                <Grid item sx={{ display: "flex", flexDirection: "column" }} xs={12}>
                  <VuiTypography color="white" variant="md" fontWeight="bold" mb="8px">
                    {t("support.contactNumbers.socialMedia")}
                  </VuiTypography>
                  <VuiBox display="flex" gap="16px" sx={{ display: "flex", flexDirection: "row" }} flexWrap="wrap">
                    {[
                      { platform: <Facebook fontSize={"large"} />, link: "https://www.facebook.com/p/Beta-Prime-School-61558133451547" },
                      { platform: <Instagram fontSize={"large"} />, link: "https://www.instagram.com/betaprimeschool/" },
                    ].map((social, index) => (
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        style={{
                          textDecoration: "none",
                          color: "#007bff",
                          fontWeight: "bold",
                        }}
                      >
                        {social.platform}
                      </a>
                    ))}
                  </VuiBox>
                </Grid>
              </Grid>
            </VuiBox>
          </Card>
          <Card sx={{ mt: 3 }}>
            {/* Inquiry Form */}
            <VuiBox p="5px">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                  {t("support.inquiryForm.title")}
                </VuiTypography>
                <VuiTypography
                  color="text"
                  variant="button"
                  fontWeight="regular"
                  mb="24px"
                  sx={{ lineHeight: "1.6", textAlign: "justify" }}
                >
                  {t("support.inquiryForm.description")}
                </VuiTypography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <VuiInput
                    placeholder={t("forms.fullName")}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VuiInput
                    name="email"
                    placeholder={t("signup.placeholder.email")}
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}

                  />
                </Grid>
                <Grid item xs={12}>
                  <VuiInput
                    placeholder={t("forms.subject")}
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <VuiInput
                    placeholder={t("forms.message")}
                    variant="outlined"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                  <VuiTypography variant="caption" color="text">
                    {formData.message.length}/1500
                  </VuiTypography>
                </Grid>
              </Grid>
              <VuiBox mt={2} display="flex" justifyContent="flex-end">
                <VuiButton disabled={isLoading}
                  variant="contained" color="info" onClick={handleSubmit}>
                  {isLoading ? t("button.processing") : t("button.submit")}
                </VuiButton>
              </VuiBox>
            </VuiBox>
          </Card>
        </Grid>
        <Grid xs={12} lg={6} item p={2}>
          {/* FAQ Section */}
          <Card sx={{ mt: 3 }}>
            <VuiBox p="5px">
              <VuiTypography color="white" variant="lg" fontWeight="bold" mb="16px">
                {t("support.faq.title")}
              </VuiTypography>
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={({ palette, borders }) => {
                  return {
                    backgroundColor: palette.inputColors, // Adjust background
                    borderRadius: `${borders.borderRadius.lg} !important`,
                    border: `0.5px solid ${palette.grey[600]}`, // Border style
                    marginTop: "10px",
                    fontSize: "1rem",
                    "& .MuiAccordionDetails-root": {
                      padding: "10px 20px",
                    },
                  };
                }}>
                  <AccordionSummary
                    style={{ background: "transparent" }}
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls={`faq-${index}-content`}
                    id={`faq-${index}-header`}
                  >
                    <VuiTypography color="white" variant="md" fontWeight="bold">
                      {faq.question}
                    </VuiTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <VuiTypography color="text" variant="button" fontWeight="regular">
                      {faq.answer}
                    </VuiTypography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </VuiBox>
          </Card>
        </Grid>

      </Grid>

    </DashboardLayout>
  );
}

export default Support;

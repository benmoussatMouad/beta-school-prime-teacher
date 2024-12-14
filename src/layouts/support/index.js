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
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box } from "@mui/material";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function Support() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // TODO: Add your form submission logic here
    alert("Your inquiry has been submitted!");
  };

  const contactNumbers = ["+1 123 456 7890", "+1 987 654 3210"];

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
                    <VuiTypography color="text" variant="button" fontWeight="regular" key={index} mb="4px">
                      {number}
                    </VuiTypography>
                  ))}
                </Grid>

                {/* Email Addresses */}
                <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }} sm={6}>
                  <VuiTypography color="white" variant="md" fontWeight="bold" mb="8px">
                    {t("support.contactNumbers.email")}
                  </VuiTypography>
                  {["support@example.com", "info@example.com"].map((email, index) => (
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
                    123 Main Street, Suite 101
                  </VuiTypography>
                  <VuiTypography color="text" variant="button" fontWeight="regular">
                    New York, NY 10001
                  </VuiTypography>
                </Grid>

                {/* Social Media Links */}
                <Grid item sx={{ display: "flex", flexDirection: "column" }} xs={12}>
                  <VuiTypography color="white" variant="md" fontWeight="bold" mb="8px">
                    {t("support.contactNumbers.socialMedia")}
                  </VuiTypography>
                  <VuiBox display="flex" gap="16px" sx={{ display: "flex", flexDirection: "row" }} flexWrap="wrap">
                    {[
                      { platform: <Facebook fontSize={"large"} />, link: "https://facebook.com" },
                      { platform: <Twitter fontSize={"large"} />, link: "https://twitter.com" },
                      { platform: <LinkedIn fontSize={"large"} />, link: "https://linkedin.com" },
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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VuiInput
                    placeholder={t("signup.placeholder.email")}
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                  />
                </Grid>
              </Grid>
              <VuiBox mt={2} display="flex" justifyContent="flex-end">
                <VuiButton variant="contained" color="info" onClick={handleSubmit}>
                  {t("button.submit")}
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

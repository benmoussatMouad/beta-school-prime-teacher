import React from 'react';
import { Card, Stack, Grid, Box } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiBadge from "components/VuiBadge";
import linearGradient from 'assets/theme/functions/linearGradient';
import colors from 'assets/theme/base/colors';
import { useTranslation } from "react-i18next";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoIosSchool } from "react-icons/io";
import { useStats } from 'api/teacher/getStats';
import { getAccessToken } from 'utils';

const StatCard = ({ title, value, icon: Icon, subtitle, customStyles = {} }) => {
  const { gradients, info } = colors;
  const { cardContent } = gradients;

  return (
    <VuiBox
      display="flex"
      p="24px"
      alignItems="center"
      sx={{
        background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
        borderRadius: '20px',
        minHeight: '130px',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        ...customStyles
      }}>
      <VuiBox display="flex" flexDirection="column" mr="auto">
        <VuiTypography color="text" variant="caption" fontWeight="medium" mb="8px">
          {title}
        </VuiTypography>
        <VuiTypography color="white" variant="h4" fontWeight="bold" mb={subtitle ? "8px" : "0"}>
          {value}
        </VuiTypography>
        {subtitle && (
          <VuiTypography color="text" variant="caption">
            {subtitle}
          </VuiTypography>
        )}
      </VuiBox>
      <VuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: info.main,
          borderRadius: '16px',
          width: '64px',
          height: '64px',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}>
        <Icon color="#fff" size="28px" />
      </VuiBox>
    </VuiBox>
  );
};

const Stats = () => {
  const { gradients, info } = colors;
  const { cardContent } = gradients;
  const { t } = useTranslation();

  const token = getAccessToken();
  const { data } = useStats(token);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  return (
    <Card>
      <VuiBox display='flex' flexDirection='column' p={0}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
          <VuiTypography variant="h4" color="white" fontWeight="bold">
            {t('profile.project.title')}
          </VuiTypography>
          <VuiBadge
            badgeContent="Beta"
            variant="gradient"
            color="warning"
          />
        </Box>

        <VuiBox width="100%" display="flex" justifyContent="center">
          <Grid 
            container 
            spacing={1} 
            sx={{
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
            <Grid item xs={12}>
              <StatCard
                title={t('profile.data.toBePaid')}
                value={formatCurrency(data?.totalTeacherDebt)}
                icon={FaMoneyBillAlt}
                subtitle={`${t('profile.data.sinceLastPayment')}: ${
                  data?.lastPayment || 0
                } ${t('profile.data.days')}`}
                customStyles={{
                  background: linearGradient(
                    info.main,
                    info.state,
                    cardContent.deg
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StatCard
                title={t('profile.data.lifetimeEarnings')}
                value={formatCurrency(data?.totalProfit || data?.allTimeProfit || 0)}
                icon={FaMoneyBillAlt}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StatCard
                title={t('profile.data.soldCourses')}
                value={data?.totalCoursesSold}
                icon={GrTransaction}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StatCard
                title={t('profile.data.soldCoursesLastMonth')}
                value={data?.coursesSoldLastMonth || data?.totalCoursesSoldLastMonth || 0}
                icon={GrTransaction}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StatCard
                title={t('profile.data.schoolGains')}
                value={`${(data?.gainPercentage || 0).toFixed(2)}%`}
                icon={IoIosSchool}
              />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default Stats;
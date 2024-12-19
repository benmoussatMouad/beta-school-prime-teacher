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

import React from 'react';
import { Card, Stack, Grid } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import GreenLightning from 'assets/images/shapes/green-lightning.svg';
import WhiteLightning from 'assets/images/shapes/white-lightning.svg';
import linearGradient from 'assets/theme/functions/linearGradient';
import colors from 'assets/theme/base/colors';
import carProfile from 'assets/images/shapes/car-profile.svg';
import LineChart from 'examples/Charts/LineCharts/LineChart';
import { lineChartDataProfile1, lineChartDataProfile2 } from 'variables/charts';
import { lineChartOptionsProfile2, lineChartOptionsProfile1 } from 'variables/charts';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import VuiBadge from "../../../../components/VuiBadge";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoIosSchool } from "react-icons/io";
const CarInformations = () => {
  const { gradients, info } = colors;
  const { cardContent } = gradients;
  const { t } = useTranslation();
  return (
    <Card>
      <VuiBox display='flex' flexDirection='column'>
        <VuiTypography variant='h4' color='white' fontWeight='bold' mb='6px'>
          {t('profile.project.title')}
          <VuiBadge badgeContent="En cours de developpement"  variant='gradient' color='warning'/>
        </VuiTypography>
        <Stack
          spacing='24px'
          background='#fff'
          sx={({ breakpoints }) => ({
            [breakpoints.up('sm')]: {
              flexDirection: 'column'
            },
            [breakpoints.up('md')]: {
              flexDirection: 'row'
            },
            [breakpoints.up('xl')]: {
              flexDirection: 'column'
            }
          })}>
          <VuiBox
            display='flex'
            flexDirection='column'
            justifyContent='center'
            sx={({ breakpoints }) => ({
              [breakpoints.only('sm')]: {
                alignItems: 'center'
              }
            })}
            alignItems='center'>
            <VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
              <VuiBox mx={7} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <FaMoneyBillAlt color='#09AD8F' size='40px' />
                <VuiTypography color='white' variant='h2' mt='6px' fontWeight='bold' mb='4px'>
                  {"23000DZD"}
                </VuiTypography>
                <VuiTypography color='text' variant='caption'>
                  {t('profile.data.toBePaid')}
                </VuiTypography>
              </VuiBox>
            </VuiBox>
            <VuiBox
              display='flex'
              justifyContent='center'
              flexDirection='column'
              sx={{ textAlign: 'center' }}>
              <VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
                { "2 " + t('profile.data.days')}
              </VuiTypography>
              <VuiTypography color='text' variant='button' fontWeight='regular'>
                {t('profile.data.sinceLastMonth')}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
          <Grid
            container
            sx={({ breakpoints }) => ({
              spacing: '24px',
              [breakpoints.only('sm')]: {
                columnGap: '0px',
                rowGap: '24px'
              },
              [breakpoints.up('md')]: {
                gap: '24px',
                ml: '50px !important'
              },
              [breakpoints.only('xl')]: {
                gap: '12px',
                mx: 'auto !important'
              }
            })}>
            <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
              <VuiBox
                display='flex'
                p='18px'
                alignItems='center'
                sx={{
                  background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                  minHeight: '110px',
                  borderRadius: '20px'
                }}>
                <VuiBox display='flex' flexDirection='column' mr='auto'>
                  <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                    {t('profile.data.lifetimeEarnings')}
                  </VuiTypography>
                  <VuiTypography
                    color='white'
                    variant='h4'
                    fontWeight='bold'
                    sx={({ breakpoints }) => ({
                      [breakpoints.only('xl')]: {
                        fontSize: '20px'
                      }
                    })}>
                    250000DZD
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    background: info.main,
                    borderRadius: '12px',
                    width: '56px',
                    height: '56px'
                  }}>
                  <FaMoneyBillAlt color='#fff' size='24px' />
                </VuiBox>
              </VuiBox>
            </Grid>
            <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
              <VuiBox
                display='flex'
                p='18px'
                alignItems='center'
                sx={{
                  background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                  borderRadius: '20px'
                }}>
                <VuiBox display='flex' flexDirection='column' mr='auto'>
                  <VuiTypography
                    color='white'
                    variant='h4'
                    fontWeight='bold'
                    sx={({ breakpoints }) => ({
                      [breakpoints.only('xl')]: {
                        fontSize: '20px'
                      }
                    })}>
                    85
                  </VuiTypography>
                  <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                    {t('profile.data.soldCourses')}
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    background: info.main,
                    borderRadius: '12px',
                    width: '56px',
                    height: '56px'
                  }}>
                  <GrTransaction color='#fff' size='24px' />
                </VuiBox>
              </VuiBox>
            </Grid>
            <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
              <VuiBox
                display='flex'
                p='18px'
                alignItems='center'
                sx={{
                  background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                  borderRadius: '20px',
                  minHeight: '110px'
                }}>
                <VuiBox display='flex' flexDirection='column' mr='auto'>
                  <VuiTypography
                    color='white'
                    variant='h4'
                    fontWeight='bold'
                    sx={({ breakpoints }) => ({
                      [breakpoints.only('xl')]: {
                        fontSize: '20px'
                      }
                    })}>
                    10
                  </VuiTypography>
                  <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                    {t('profile.data.soldCoursesLastMonth')}
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    background: info.main,
                    borderRadius: '12px',
                    width: '56px',
                    height: '56px'
                  }}>
                  <GrTransaction color='#fff' size='24px' />
                </VuiBox>
              </VuiBox>
            </Grid>
            <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
              <VuiBox
                display='flex'
                p='18px'
                alignItems='center'
                sx={{
                  background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                  borderRadius: '20px'
                }}>
                <VuiBox display='flex' flexDirection='column' mr='auto'>
                  <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                    {t('profile.data.schoolGains')}
                  </VuiTypography>
                  <VuiTypography
                    color='white'
                    variant='h4'
                    fontWeight='bold'
                    sx={({ breakpoints }) => ({
                      [breakpoints.only('xl')]: {
                        fontSize: '20px'
                      }
                    })}>
                    40%
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    background: info.main,
                    borderRadius: '12px',
                    width: '56px',
                    height: '56px'
                  }}>
                  <IoIosSchool color='#fff' size='24px' />
                </VuiBox>
              </VuiBox>
            </Grid>
          </Grid>
        </Stack>
      </VuiBox>
    </Card>
  );
};

export default CarInformations;

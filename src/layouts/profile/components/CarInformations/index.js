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
const CarInformations = () => {
  const { gradients, info } = colors;
  const { cardContent } = gradients;
  const { t } = useTranslation();
  return (
    <Card
      sx={({ breakpoints }) => ({
        [breakpoints.up('xxl')]: {
          maxHeight: '400px'
        }
      })}>
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
              {/*<CircularProgress variant='determinate' value={60} size={170} color='info' />*/}
              <VuiBox mx={7} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <FaMoneyBillAlt color='#09AD8F' size='40px' />
                <VuiTypography color='white' variant='h2' mt='6px' fontWeight='bold' mb='4px'>
                  23 000 DA
                </VuiTypography>
                <VuiTypography color='text' variant='caption'>
                  Dues ce mois
                </VuiTypography>
              </VuiBox>
            </VuiBox>
            <VuiBox
              display='flex'
              justifyContent='center'
              flexDirection='column'
              sx={{ textAlign: 'center' }}>
              <VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
                2 jours
              </VuiTypography>
              <VuiTypography color='text' variant='button' fontWeight='regular'>
                depuis la fin du mois
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
                    Battery Health
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
                    76%
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
                  <VuiBox component='img' src={carProfile} />
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
                    Efficiency
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
                    +20%
                  </VuiTypography>
                </VuiBox>
                <VuiBox sx={{ maxHeight: '75px' }}>
                  <LineChart
                    lineChartData={lineChartDataProfile1}
                    lineChartOptions={lineChartOptionsProfile1}
                  />
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
                  <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                    Consumption
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
                    163W/km
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
                  <VuiBox component='img' src={WhiteLightning} />
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
                    This Week
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
                    1.342km
                  </VuiTypography>
                </VuiBox>
                <VuiBox sx={{ maxHeight: '75px' }}>
                  <LineChart
                    lineChartData={lineChartDataProfile2}
                    lineChartOptions={lineChartOptionsProfile2}
                  />
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

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type Props = {};
export default function WhyChooseUs({}: Props) {
  return (
    <Box
      sx={{
        backgroundImage: 'url("assets/images/bg1.jpg")',
        width: "100%",
        color: "white",
      }}
    >
      <Container maxWidth='xl' sx={{ pt: 10, pb: 10, mb: 5 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant='h3' mb={3}>
              Why Choose Us?
            </Typography>
            <Timeline
              position='right'
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot>
                    <CheckIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant='h6' fontWeight={700}>
                    Quick Response
                  </Typography>
                  <Typography>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.since when an unknown printer
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot>
                    <CheckIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant='h6' fontWeight={700}>
                    Experienced
                  </Typography>
                  <Typography>
                    We denounce with righteous indignation and dislike men who
                    are so beguiled and demoralized by the charms of pleasure of
                    the moment blinded
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot>
                    <CheckIcon />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant='h6' fontWeight={700}>
                    Flexible Payment
                  </Typography>
                  <Typography>
                    Accusamus et iusto odio dignissimos ducimusa blanditiis
                    praesentium voluptatum deleno atque corrupti quos dolores
                    quas molestias except occaecati
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

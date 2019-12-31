import React from "react";
import { EventDetail } from "../../../services/models/Events/Event";
import Carousel from 'react-material-ui-carousel'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { isEmpty } from '../../../services/objectsservices';
type LastEventsProps = {
  events: EventDetail[];
};
const LastEvents: React.SFC<LastEventsProps> = ({ events }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {!isEmpty(events) && (
        <div className="pricing-section feature_huge text-center" id="ultimosEventos">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 ">
                <div className="pricing-intro">
                  <h1 className="wow fadeInUp" data-wow-delay="0s">
                    Ultimos Eventos
                </h1>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                   Estos son los ultimos eventos en los que la comunidad de NET-Baires, participó como organizadora o colaboradora.
                                                                                              
                </p>
                </div>
                <div className="row">
                  <Slider previousButton={() => (<></>)} nextButton={() => (<></>)} autoplay={4}>
                    {events.map((event, index) => (
                      // <div
                      //   className="table-left wow fadeInUp"
                      //   data-wow-delay="0.4s"
                      // >
                      //   <div className="icon">
                      //     <img src={
                      //       event.imageUrl != null
                      //         ? event.imageUrl
                      //         : "/assets/images/imagenotfound.png"
                      //     } alt="Icon" />
                      //   </div>
                      //   <div className="pricing-details">
                      //     <h2>Beginner Plan</h2>
                      //     <span>$5.90</span>
                      //     <p>
                      //       Pay little enjoy the product
                      //         <br className="hidden-xs" /> for life time.
                      //        </p>
                      //     <ul>
                      //       <li>First basic feature </li>
                      //       <li>Second feature goes here</li>
                      //       <li>Any other third feature</li>
                      //       <li>And the last one goes here</li>
                      //     </ul>
                      //     <button className="btn btn-primary btn-action btn-fill">
                      //       Get Plan
                      //        </button>
                      //   </div>
                      // </div>
                      <div key={index} className="img-slider-home" style={{backgroundImage:`url(${
                        event.imageUrl != null
                          ? event.imageUrl
                          : "/assets/images/imagenotfound.png"
                      }) `}}>

                      </div>

                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}

    </>
  );
};

export default LastEvents;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);
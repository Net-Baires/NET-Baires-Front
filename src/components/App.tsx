import React, { MouseEvent } from "react";
import "../styles/index.css";
import Login from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home/Index";
import historyRouter from "./router/HistoryRouter";
import Organizers from "./organizers";
import NotFound from "./notFound";
import Header from "./Header";
import Footer from "./Footer";
import Sponsor from "./Sponsor";
import SpeakerDetail from "./SpeakerDetail";
import OrganizerDetail from "./OrganizerDetail";
import ControlPanel from "./Admin/controlPanel";
import { PrivateRoute } from "./router/PrivateRoute";
import LoadingOverlay from "react-loading-overlay";
import { AppState } from "../store";
import { loading, ready } from "../store/loading/actions";
import { connect } from "react-redux";
import { SyncEvent } from "./Admin/Events/SyncEvent";
import { EventsList } from "./Admin/Events/EventsList";
import { EditSponsor } from "./Admin/Sponsors/EditSponsor";
import { NewSponsor } from "./Admin/Sponsors/NewSponsor";
import { EditEvent } from "./Admin/Events/EditEvent";
import { EventsToSync } from "./Admin/Events/EventsToSync";
import { SponsorsList } from "./Admin/Sponsors/SponsorsList";
import MeetupCallBack from "./Login/MeetupCallBack";
import { EventLiveAssistance } from "./Admin/Events/EventLiveAssistance";
import { UsersList } from "./Admin/Users/UsersList";
import { EditUser } from "./Admin/Users/EditUser";
import { NewUser } from "./Admin/Users/NewUser";
import EventBriteCallBack from "./Login/EventBriteCallBack";
import { PublicProfile } from "./Profile/PublicProfile";
import { EventsInLive } from "./EventLive/EventsInLive";
import { ReportAssistance } from "./ReportAssistance/Index";
import { JoinSlack } from "./JoinSlack/Index";
import { UserProfile } from "./Profile/UserProfile";
import { CheckAssistanceGeneral } from "./Admin/Events/CheckAssistanceGeneral";
import { EventsInLiveToDo } from "./Admin/Events/EventsInLiveToDo";
import { ReadOrganizedCode } from "./MemberLogged/ReadOrganizedCode";
import { BadgeShowDetail } from "./Badges/BadgeShowDetail";
import { BadgesListPublic } from "./Badges/BadgesListPublic";
import { NewBadge } from "./Admin/Badges/NewBadge";
import { EditBadge } from "./Admin/Badges/EditBadge";
import { BadgesList } from "./Admin/Badges/BadgesList";

interface AppProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
}

export const App: React.SFC<AppProps> = props => {
  return (
    <>
      <Router history={historyRouter}>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <LoadingOverlay active={props.isLoading} spinner text="Procesando...">
            <Route exact path="/organizers" component={Organizers} />
            <Route exact path="/JoinSlack" component={JoinSlack} />
            <Route
              exact
              path="/organizers/:id(\d+)?"
              component={OrganizerDetail}
            />

            <Route exact path="/speaker/:id(\d+)?" component={SpeakerDetail} />

            <Route
              exact
              path="/members/:id(\d+)/profile"
              component={PublicProfile}
            />
            <Route exact path="/sponsor/:id(\d+)?" component={Sponsor} />
            <Route exact path="/login/meetup" component={MeetupCallBack} />
            <Route
              exact
              path="/login/eventBrite"
              component={EventBriteCallBack}
            />
            <Route exact path="/badges/:id(\d+)" component={BadgeShowDetail} />
            <Route exact path="/badges" component={BadgesListPublic} />

            <Route exact path="/events/live" component={EventsInLive} />
            <PrivateRoute
              exact
              path="/member/reportAssistance/:id(\d+)?"
              component={ReportAssistance}
            />

            <PrivateRoute
              exact
              path="/admin/eventsToSync"
              component={EventsToSync}
            />
            <PrivateRoute exact path="/admin/events" component={EventsList} />
            <PrivateRoute
              exact
              path="/admin/events/:id(\d+)?/edit"
              component={EditEvent}
            />
            <PrivateRoute
              exact
              path="/admin/eventsToSync/:id/:platform/sync"
              component={SyncEvent}
            />
            <PrivateRoute
              exact
              path="/admin/sponsors/new"
              component={NewSponsor}
            />
            <PrivateRoute
              exact
              path="/admin/sponsors/:id/edit"
              component={EditSponsor}
            />
            <PrivateRoute
              exact
              path="/admin/events/:id/assistance/general"
              component={CheckAssistanceGeneral}
            />

            <PrivateRoute
              exact
              path="/admin/sponsors"
              component={SponsorsList}
            />
            <PrivateRoute
              exact
              path="/admin/events/live"
              component={EventsInLiveToDo}
            />
            <PrivateRoute
              exact
              path="/admin/EventLive/Assistance"
              component={EventLiveAssistance}
            />
            <PrivateRoute
              exact
              path="/EventLive/:id(\d+)"
              component={EventLiveAssistance}
            />

            <PrivateRoute
              exact
              path="/member/organizedcode/read"
              component={ReadOrganizedCode}
            />
            <PrivateRoute exact path="/admin/users" component={UsersList} />
            <PrivateRoute
              exact
              path="/admin/users/:id(\d+)/Edit"
              component={EditUser}
            />
            <PrivateRoute exact path="/admin/users/new" component={NewUser} />

            <PrivateRoute exact path="/admin/badges" component={BadgesList} />
            <PrivateRoute
              exact
              path="/admin/badges/:id(\d+)/Edit"
              component={EditBadge}
            />
            <PrivateRoute exact path="/admin/badges/new" component={NewBadge} />

            <PrivateRoute exact path="/profile" component={UserProfile} />

            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/admin/panel" component={ControlPanel} />
          </LoadingOverlay>
          <Route exact path="*" component={NotFound} />
        </Switch>
        <Footer></Footer>
      </Router>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.loading.isLoading
});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

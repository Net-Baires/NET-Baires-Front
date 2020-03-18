import React from "react";
// import "../styles/index.css";
import Login from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home/Index";
import historyRouter from "./router/HistoryRouter";
import Organizers from "./organizers";
import SpeakerDetail from "./SpeakerDetail";
import OrganizerDetail from "./OrganizerDetail";
import { PrivateRoute } from "./router/PrivateRoute";
import { AppState } from "../store";
import { loading, ready } from "../store/loading/actions";
import { connect } from "react-redux";
import { SyncEvent } from "./admin/Events/SyncEvent";
import { EventsList } from "./admin/Events/EventsList";
import { EditSponsor } from "./admin/Sponsors/EditSponsor";
import { NewSponsor } from "./admin/Sponsors/NewSponsor";
import { EventsToSync } from "./admin/Events/EventsToSync";
import { SponsorsList } from "./admin/Sponsors/SponsorsList";
import MeetupCallBack from "./Login/MeetupCallBack";
import { EventLiveAttendances } from "./admin/Events/EventLiveAttendances";
import { UsersList } from "./admin/Users/UsersList";
import { EditUser } from "./admin/Users/EditUser";
import { NewUser } from "./admin/Users/NewUser";
import EventBriteCallBack from "./Login/EventBriteCallBack";
import { PublicProfile } from "./Profile/PublicProfile";
import { EventsInLive } from "./EventLive/EventsInLive";
import { ReportAttendance } from "./ReportAttendance/Index";
import { JoinSlack } from "./JoinSlack/Index";
import { UserProfile } from "./Profile/UserProfile";
import { CheckAttendancesGeneral } from "./admin/Events/CheckAttendancesGeneral";
import { EventsInLiveToDo } from "./admin/Events/EventsInLiveToDo";
import { ReadOrganizedCode } from "./MemberLogged/ReadOrganizedCode";
import { BadgeShowDetail } from "./Badges/BadgeShowDetail";
import { BadgesListPublic } from "./Badges/BadgesListPublic";
import { NewBadge } from "./admin/Badges/NewBadge";
import { EditBadge } from "./admin/Badges/EditBadge";
import { BadgesList } from "./admin/Badges/BadgesList";
import NotFoundPage from "./NotFoundPage/Index";
import { EditEventPage } from "./admin/Events/EditEventPage";
import { AdminWrapper } from "./admin/Wrapper";
import { HomeWrapper } from "./Home/HomeWrapper";
import LogoutComponent from "./Login/LogoutComponent";
import { EventsLivePublicDetail } from "./EventLive/EventsLivePublicDetail";
import { LastLocationProvider } from "react-router-last-location";
import { ControlPanel } from "./MemberLogged/ControlPanel";
import { EventLivePanel } from "./Pages/EventLivePanel";
import { AssignBadge } from "./Admin/Badges/AssignBadge";
import { AdminGroupCodes } from "./GroupCodes/AdminGroupCodes";
import { EarnedBadgeDetail } from './Admin/Badges/EarnedBadgeDetail';
import { MyBadgesPage } from './Admin/Badges/MyBadgesPage';
import { MemberBadgeDetail } from './Badges/MemberBadgeDetail';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';
import { Config } from '../services/config';
import { SponsorDetailPublicPage } from './Sponsor/SponsorDetailPublicPage';
import { EventsLivePublickBroadcasting } from './EventLive/EventsLivePublickBroadcasting';
var reactPlugin = new ReactPlugin();
const browserHistory = createBrowserHistory({ basename: '' });
var appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: Config.instrumentationKey,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});
appInsights.loadAppInsights();
interface AppProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
}

export const App: React.SFC<AppProps> = () => {
  return (
    <>
      <Router history={historyRouter}>
        <LastLocationProvider>
          {/* <Header></Header> */}
          <Switch>
            <Route exact path="/">
              <HomeWrapper>
                <Home></Home>
              </HomeWrapper>
            </Route>
            <Route exact path="/JoinSlack">
              <HomeWrapper>
                <JoinSlack></JoinSlack>
              </HomeWrapper>
            </Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/logout" component={LogoutComponent}></Route>
            <Route
              exact
              path="/login/meetup"
              component={MeetupCallBack}
            ></Route>
            <Route exact path="/login/eventBrite">
              <HomeWrapper>
                <EventBriteCallBack></EventBriteCallBack>
              </HomeWrapper>
            </Route>

            <Route exact path="/organizers">
              <Organizers></Organizers>
            </Route>

            <Route exact path="/organizers/:id(\d+)?">
              <HomeWrapper>
                <OrganizerDetail></OrganizerDetail>
              </HomeWrapper>
            </Route>

            <Route exact path="/speakers/:id(\d+)?">
              <HomeWrapper>
                <SpeakerDetail></SpeakerDetail>
              </HomeWrapper>
            </Route>

            <Route exact path="/members/:id(\d+)/profile">
              <HomeWrapper>
                <PublicProfile></PublicProfile>
              </HomeWrapper>
            </Route>
            <Route exact path="/sponsors/:id(\d+)?">
              <HomeWrapper>
                <SponsorDetailPublicPage></SponsorDetailPublicPage>
              </HomeWrapper>
            </Route>

            <Route exact path="/badges/:id(\d+)">
              <HomeWrapper>
                <BadgeShowDetail></BadgeShowDetail>
              </HomeWrapper>
            </Route>
            <Route exact path="/members/:memberId(\d+)/badges/:id(\d+)">
              <HomeWrapper>
                <MemberBadgeDetail></MemberBadgeDetail>
              </HomeWrapper>
            </Route>
            <Route exact path="/notfound">
              <HomeWrapper>
                <NotFoundPage></NotFoundPage>
              </HomeWrapper>
            </Route>

            <Route exact path="/badges">
              <HomeWrapper>
                <BadgesListPublic></BadgesListPublic>
              </HomeWrapper>
            </Route>

            <Route exact path="/events/live">
              <HomeWrapper>
                <EventsInLive></EventsInLive>
              </HomeWrapper>
            </Route>
            <Route exact path="/live">
              <HomeWrapper>
                <EventsLivePublickBroadcasting></EventsLivePublickBroadcasting>
              </HomeWrapper>
            </Route>


            <Route exact path="/events/:id/live">
              <HomeWrapper>
                <EventsLivePublicDetail></EventsLivePublicDetail>
              </HomeWrapper>
            </Route>
            {/* <PrivateRoute
            exact
            path="/EventLive/:id(\d+)"
            component={EventLiveAttendances}
          /> */}

            <AdminWrapper>
              <PrivateRoute
                exact
                path="/app/events/:id(\d+)/attendance"
                component={ReportAttendance}
              />
              <PrivateRoute
                roles={["Admin", "Organizer", "Member"]}
                exact
                path="/app/events/:id/live/panel"
                component={EventLivePanel}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/events/sync"
                component={EventsToSync}
              />
              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/app/EventLive/Attendances"
                component={EventLiveAttendances}
              />
              <PrivateRoute exact path="/app/profile" component={UserProfile} />
              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/app/events/live"
                component={EventsInLiveToDo}
              />
              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/app/badges/assign"
                component={AssignBadge}
              />
              <PrivateRoute
                roles={["Member"]}
                exact
                path="/app/earned/badges/:id/detail"
                component={EarnedBadgeDetail}
              />
              <PrivateRoute
                roles={["Member"]}
                exact
                path="/app/earned/badges"
                component={MyBadgesPage}
              />


              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/app/events/:id/attendances/general"
                component={CheckAttendancesGeneral}
              />
              <PrivateRoute exact path="/app/events" component={EventsList} />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/events/:id(\d+)?/edit"
                component={EditEventPage}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/eventsToSync/:id/:platform/sync"
                component={SyncEvent}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/sponsors/new"
                component={NewSponsor}
              />
              <PrivateRoute
                roles={["Admin", "Organizer", "Member"]}
                exact
                path="/app/panel"
                component={ControlPanel}
              ></PrivateRoute>
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/sponsors/:id/edit"
                component={EditSponsor}
              />
              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/app/events/:idEvent/live/groupcodes/:idGroupCode/panel"
                component={AdminGroupCodes}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/sponsors"
                component={SponsorsList}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/members"
                component={UsersList}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/users/:id(\d+)/Edit"
                component={EditUser}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/users/new"
                component={NewUser}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/badges"
                component={BadgesList}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/badges/:id(\d+)/Edit"
                component={EditBadge}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/app/badges/new"
                component={NewBadge}
              />
              <PrivateRoute
                roles={["Member"]}
                exact
                path="/app/organizedcode/read"
                component={ReadOrganizedCode}
              />
            </AdminWrapper>
            <Route exact path="*">
              <NotFoundPage></NotFoundPage>
            </Route>
          </Switch>
          {/* <Footer></Footer> */}
        </LastLocationProvider>
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

export const AppConnected = connect(mapStateToProps, mapDispatchToProps)(withAITracking(reactPlugin, App));

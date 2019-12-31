import React, { useEffect } from "react";
// import "../styles/index.css";
import Login from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home/Index";
import historyRouter from "./router/HistoryRouter";
import Organizers from "./organizers";
import Sponsor from "./Sponsor";
import SpeakerDetail from "./SpeakerDetail";
import OrganizerDetail from "./OrganizerDetail";
import ControlPanel from "./Admin/AdminControlPanel";
import { PrivateRoute } from "./router/PrivateRoute";
import { AppState } from "../store";
import { loading, ready } from "../store/loading/actions";
import { connect } from "react-redux";
import { SyncEvent } from "./Admin/Events/SyncEvent";
import { EventsList } from "./Admin/Events/EventsList";
import { EditSponsor } from "./Admin/Sponsors/EditSponsor";
import { NewSponsor } from "./Admin/Sponsors/NewSponsor";
import { EventsToSync } from "./Admin/Events/EventsToSync";
import { SponsorsList } from "./Admin/Sponsors/SponsorsList";
import MeetupCallBack from "./Login/MeetupCallBack";
import { EventLiveAttendances } from "./Admin/Events/EventLiveAttendances";
import { UsersList } from "./Admin/Users/UsersList";
import { EditUser } from "./Admin/Users/EditUser";
import { NewUser } from "./Admin/Users/NewUser";
import EventBriteCallBack from "./Login/EventBriteCallBack";
import { PublicProfile } from "./Profile/PublicProfile";
import { EventsInLive } from "./EventLive/EventsInLive";
import { ReportAttendance } from "./ReportAttendance/Index";
import { JoinSlack } from "./JoinSlack/Index";
import { UserProfile } from "./Profile/UserProfile";
import { CheckAttendancesGeneral } from "./Admin/Events/CheckAttendancesGeneral";
import { EventsInLiveToDo } from "./Admin/Events/EventsInLiveToDo";
import { ReadOrganizedCode } from "./MemberLogged/ReadOrganizedCode";
import { BadgeShowDetail } from "./Badges/BadgeShowDetail";
import { BadgesListPublic } from "./Badges/BadgesListPublic";
import { NewBadge } from "./Admin/Badges/NewBadge";
import { EditBadge } from "./Admin/Badges/EditBadge";
import { BadgesList } from "./Admin/Badges/BadgesList";
import NotFoundPage from "./NotFoundPage/Index";
import { EditEventPage } from "./Admin/Events/EditEventPage";
import { AdminWrapper } from "./Admin/Wrapper";
import { HomeWrapper } from "./Home/HomeWrapper";
import LogoutComponent from "./Login/LogoutComponent";
import { AdminEventLivePanel } from "./Admin/Events/EventLive/AdminEventLivePanel";
import MemberControlPanel from "./MemberLogged/MemberControlPanel";
import { EventsLivePublicDetail } from "./EventLive/EventsLivePublicDetail";
import { MemberEventLivePanel } from './MemberLogged/MemberEventLivePanel';
import { LastLocationProvider } from 'react-router-last-location';

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
            <Route exact path="/login/meetup" component={MeetupCallBack}></Route>
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

            <Route exact path="/speaker/:id(\d+)?">
              <HomeWrapper>
                <SpeakerDetail></SpeakerDetail>
              </HomeWrapper>
            </Route>

            <Route exact path="/members/:id(\d+)/profile">
              <PublicProfile></PublicProfile>
            </Route>
            <Route exact path="/sponsor/:id(\d+)?">
              <Sponsor></Sponsor>
            </Route>

            <Route exact path="/badges/:id(\d+)">
              <BadgeShowDetail></BadgeShowDetail>
            </Route>
            <Route exact path="/badges">
              <BadgesListPublic></BadgesListPublic>
            </Route>

            <Route exact path="/events/live">
              <HomeWrapper>
                <EventsInLive></EventsInLive>
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
                path="/member/events/:id(\d+)/attendance"
                component={ReportAttendance}
              />
              <PrivateRoute
                roles={["Member"]}
                exact
                path="/member/panel"
                component={MemberControlPanel}
              ></PrivateRoute>
              <PrivateRoute
                roles={["Member"]}
                exact
                path="/member/events/:id/live/panel"
                component={MemberEventLivePanel}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/admin/eventsToSync"
                component={EventsToSync}
              />
              {/* Reportar asistencia */}
              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/admin/EventLive/Attendances"
                component={EventLiveAttendances}
              />
              <PrivateRoute exact path="/admin/profile" component={UserProfile} />
              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/admin/events/live"
                component={EventsInLiveToDo}
              />

              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/admin/events/:id/attendances/general"
                component={CheckAttendancesGeneral}
              />
              <PrivateRoute
                roles={["Admin", "Organizer"]}
                exact
                path="/admin/events/:id/live/panel"
                component={AdminEventLivePanel}
              />

              <PrivateRoute exact path="/admin/events" component={EventsList} />
              <PrivateRoute
                exact
                path="/admin/events/:id(\d+)?/edit"
                component={EditEventPage}
              />
              <PrivateRoute
                exact
                path="/admin/eventsToSync/:id/:platform/sync"
                component={SyncEvent}
              />
              <PrivateRoute
                roles={["Admin"]}
                exact
                path="/admin/sponsors/new"
                component={NewSponsor}
              />
              <PrivateRoute roles={["Admin", "Organizer"]} exact path="/admin/panel" component={ControlPanel}              ></PrivateRoute>
              <PrivateRoute roles={["Admin"]} exact path="/admin/sponsors/:id/edit" component={EditSponsor} />
              <PrivateRoute roles={["Admin"]} exact path="/admin/sponsors" component={SponsorsList} />
              <PrivateRoute roles={["Admin"]} exact path="/admin/members" component={UsersList} />
              <PrivateRoute roles={["Admin"]} exact path="/admin/users/:id(\d+)/Edit" component={EditUser} />
              <PrivateRoute roles={["Admin"]} exact path="/admin/users/new" component={NewUser} />
              <PrivateRoute roles={["Admin"]} exact path="/admin/badges" component={BadgesList} />
              <PrivateRoute roles={["Admin"]} exact path="/admin/badges/:id(\d+)/Edit" component={EditBadge} />
              <PrivateRoute roles={["Admin"]} exact path="/admin/badges/new" component={NewBadge} />
              <PrivateRoute roles={["Member"]} exact path="/member/organizedcode/read" component={ReadOrganizedCode} />
            </AdminWrapper>




            <Route exact path="/notfound" component={NotFoundPage} />
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

export const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

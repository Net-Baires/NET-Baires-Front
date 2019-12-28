import React from "react";
// import "../styles/index.css";
import Login from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home/Index";
import historyRouter from "./router/HistoryRouter";
import Organizers from "./organizers";
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
import { EventLiveDashBoard } from "./EventLive/EventLiveDashBoard";
import { EditEventPage } from "./Admin/Events/EditEventPage";
import { AdminWrapper } from "./Admin/Wrapper";
import { HomeWrapper } from "./Home/HomeWrapper";
import { EmptyWrapper } from "./Home/EmptyWrapper";
import { newSponsor } from "../services/sponsorsServices";
import LogoutComponent from "./Login/LogoutComponent";
import { AdminEventLivePanel } from "./Admin/Events/EventLive/AdminEventLivePanel";
import MemberControlPanel from "./MemberLogged/MemberControlPanel";
import { EventsLivePublicDetail } from "./EventLive/EventsLivePublicDetail";
interface AppProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
}

export const App: React.SFC<AppProps> = props => {
  return (
    <>
      <Router history={historyRouter}>
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
            <OrganizerDetail></OrganizerDetail>
          </Route>

          <Route exact path="/speaker/:id(\d+)?">
            <SpeakerDetail></SpeakerDetail>
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
              exact
              path="/member/panel"
              component={MemberControlPanel}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/member/events/:id/live/panel"
              component={EventLiveDashBoard}
            />
            <PrivateRoute
              exact
              path="/admin/eventsToSync"
              component={EventsToSync}
            />
            <PrivateRoute
              exact
              path="/admin/EventLive/Attendances"
              component={EventLiveAttendances}
            />

            <PrivateRoute
              exact
              path="/admin/events/live"
              component={EventsInLiveToDo}
            />

            <PrivateRoute
              exact
              path="/admin/events/:id/attendances/general"
              component={CheckAttendancesGeneral}
            />
            <PrivateRoute
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
              exact
              path="/admin/sponsors/new"
              component={NewSponsor}
            />
            <PrivateRoute
              exact
              path="/admin/panel"
              component={ControlPanel}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/admin/sponsors/:id/edit"
              component={EditSponsor}
            />
            <PrivateRoute
              exact
              path="/admin/sponsors"
              component={SponsorsList}
            />
            <PrivateRoute exact path="/admin/users" component={UsersList} />
            <PrivateRoute
              exact
              path="/admin/users/:id(\d+)/Edit"
              component={EditUser}
            />
            <PrivateRoute exact path="/admin/users/new" component={NewUser} />
          </AdminWrapper>

          <PrivateRoute
            exact
            path="/member/organizedcode/read"
            component={ReadOrganizedCode}
          />

          <PrivateRoute exact path="/admin/badges" component={BadgesList} />
          <PrivateRoute
            exact
            path="/admin/badges/:id(\d+)/Edit"
            component={EditBadge}
          />
          <PrivateRoute exact path="/admin/badges/new" component={NewBadge} />

          <PrivateRoute exact path="/admin/profile" component={UserProfile} />

          <Route exact path="/notfound" component={NotFoundPage} />
          <Route exact path="*">
            <NotFoundPage></NotFoundPage>
          </Route>
        </Switch>
        {/* <Footer></Footer> */}
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

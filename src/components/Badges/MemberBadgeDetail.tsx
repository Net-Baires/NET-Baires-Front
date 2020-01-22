import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { BadgeMemberViewModel } from "../../services/models/BadgeDetail";
import { getBadgeFromMeber, getMemberDetail } from '../../services/membersServices';
import { useParams } from 'react-router-dom';
import { Member } from '../../services/models/Member';
import { isEmpty } from '../../services/objectsservices';
import { BadgeShowDetailContainer } from './BadgeShowDetailContainer';
import { formatStringDate } from '../../helpers/DateHelpers';
type BadgeDetailProps = {
  loading: () => void;
  ready: () => void;
};
type BadgeDetailParams = {
  id: string;
};

type BadgeDetailPropsAndRouter = BadgeDetailParams & BadgeDetailProps;
export const MemberBadgeDetailComponent: React.SFC<
  RouteComponentProps<BadgeDetailPropsAndRouter> & BadgeDetailProps
> = ({ loading, ready }) => {
  const history = useHistory();
  const { id, memberId } = useParams();

  const [memberDetail, setMemberDetail] = useState<Member>({} as Member);
  const [badgeMemberDetail, setBadgeMemberDetail] = useState<BadgeMemberViewModel>({} as BadgeMemberViewModel);
  useEffect(() => {
    loading();
    getBadgeFromMeber(+memberId!, +id!).then(d => {
      setBadgeMemberDetail(d);
      getMemberDetail(+memberId!).then(m => {
        setMemberDetail(m);
        ready();
      });
    }).catch(x => {
      ready();
      history.push("/notfound");
    })
  }, []);

  return (<>


    <div className="client-section">
      <div className="container text-center">
        <div className="clients owl-carousel owl-theme" style={{ opacity: "1", "display": "block" }}>
          <div className="owl-wrapper-outer">
            <div className="owl-wrapper">
              <div className="owl-item row" style={{ minHeight: "120px", paddingBottom: "10px" }}>
                <div className="col-md-2">
                  <img
                    style={{ height: "80px", width: "80px", marginTop: "15px" }}
                    src={
                      memberDetail!.picture != "" && memberDetail!.picture != null
                        ? memberDetail!.picture
                        : "assets/images/no-image-profile.png"
                    }
                  ></img>

                </div>
                <div className="col-md-10">
                  <h4 className="member-badge-message-sup" style={{ marginTop: "40px" }}>El miembro <a
                    style={{ color: "#256899", textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => history.push(`/members/${memberDetail.id}/profile`)}>
                    {memberDetail.firstName} {memberDetail.lastName} {" "}
                  </a>
                    {!isEmpty(badgeMemberDetail) && <>
                      recibío este badge el {formatStringDate(badgeMemberDetail.assignmentDate)}
                    </>
                    }
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BadgeShowDetailContainer idBadge={+id!}></BadgeShowDetailContainer>
  </>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const MemberBadgeDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberBadgeDetailComponent);

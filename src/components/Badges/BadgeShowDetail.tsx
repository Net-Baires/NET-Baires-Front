import React from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { useParams } from 'react-router-dom';
import { BadgeShowDetailContainer } from './BadgeShowDetailContainer';

type BadgeDetailProps = {
  loading: () => void;
  ready: () => void;
};
type BadgeDetailParams = {
  id: string;
};

type BadgeDetailPropsAndRouter = BadgeDetailParams & BadgeDetailProps;
export const BadgeShowDetailComponent: React.SFC<
  RouteComponentProps<BadgeDetailPropsAndRouter> & BadgeDetailProps
> = () => {
  const { id } = useParams();

  // const [, setMembers] = useState(new Array<Member>());
  // useEffect(() => {
  //   loading();
  //   getMembersInBadge(+id!).then(x => {
  //     setMembers(x);
  //     ready();
  //   });
  // }, []);

  return (
    <>
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

export const BadgeShowDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeShowDetailComponent);

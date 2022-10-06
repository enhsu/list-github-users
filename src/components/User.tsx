import styled from "styled-components";
import { selectUsers, UserType } from "~/store/asyncData/slice";
import { useRouter } from "next/router";
import SiteAdmin from "./SiteAdmin";
import { useAppSelector } from "~/store";

function User(props: UserType) {
  const router = useRouter();
  const { avatar_url, login, site_admin } = props;
  const users: UserType[] = useAppSelector(selectUsers);

  const handleGoUserDetail = () => {
    // console.log("go user");
    router.push(`/${login}?since=${users[0].id - 1}`);
  };
  return (
    <Container onClick={() => handleGoUserDetail()}>
      <Picture>
        <AvatarUrl src={avatar_url} alt={`${login} image`} />
      </Picture>
      <Login>{login}</Login>
      <SiteAdmin site_admin={site_admin} />
    </Container>
  );
}

export default User;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  :hover {
    cursor: pointer;
  }
`;

const Picture = styled.picture``;

const AvatarUrl = styled.img`
  width: 100%;
  height: 200px;
  min-height: 200px;
  min-width: 100%;
`;

const Login = styled.h1`
  font-size: 1rem;
  word-break: break-all;
`;

const SiteContainer = styled.div`
  display: flex;
  align-items: center;
`;

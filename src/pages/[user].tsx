import { useRouter } from "next/router";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchUser } from "~/store/asyncData/action";
import { selectUser, UserType } from "~/store/asyncData/slice";
import SiteAdmin from "~/components/SiteAdmin";
import { useEffect } from "react";

function UserDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user: UserType = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUser(router.query.user as string));
  }, [dispatch, router.query.user]);
  const handleGoBack = () => {
    router.push(`/?since=${router.query.since}`);
  };

  return (
    <Container>
      <ContentContainer>
        <PrevContainer onClick={() => handleGoBack()}>
          Go back to list
        </PrevContainer>
        <InfoContainer>
          {user && (
            <>
              <Picture>
                <AvatarUrl src={user.avatar_url} />
              </Picture>
              <Name>{user.name}</Name>
              {user.bio && <Bio>Bio: {user.bio}</Bio>}
              <Login>{user.login}</Login>
              <SiteAdmin site_admin={user.site_admin} />
              {/* Location */}
              {user.location && <Location>#{user.location}</Location>}
              {/* Blog */}
              {user.blog && (
                <Blog>
                  Blog:{" "}
                  <a href={user.blog} target="_blank" rel="noreferrer">
                    {user.blog}
                  </a>
                </Blog>
              )}
            </>
          )}
        </InfoContainer>
      </ContentContainer>
    </Container>
  );
}

export default UserDetail;

const Container = styled.div``;

const ContentContainer = styled.div`
  max-width: 990px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
`;

const PrevContainer = styled.button`
  align-self: flex-start;
`;

const InfoContainer = styled.div``;

const Picture = styled.picture``;

const AvatarUrl = styled.img`
  width: 400px;
`;

const Name = styled.h1``;

const Bio = styled.p``;

const Login = styled.p``;

const Location = styled.p``;

const Blog = styled.p``;

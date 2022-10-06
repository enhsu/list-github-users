import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store";
import User from "~/components/User";
import { fetchUsers } from "~/store/asyncData/action";
import { selectUsers, UserType } from "~/store/asyncData/slice";
import Pagination from "~/components/Paginatioin";
import { useRouter } from "next/router";

function Home() {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query.since) {
      dispatch(fetchUsers(Number(router.query.since)));
    } else {
      dispatch(fetchUsers(0));
    }
  }, [dispatch, router.query]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Github users</title>
        <meta
          name="description"
          content="List information about the currently authenticated user on github"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        {/* <button onClick={() => dispatch(fetchUsers())}>Fetch users</button> */}
        <Container>
          <Title>Github users</Title>
          <UsersContainer>
            {users &&
              users.length > 0 &&
              users.map((user: UserType) => <User key={user.id} {...user} />)}
          </UsersContainer>
          <Pagination />
        </Container>
      </MainContainer>
    </div>
  );
}

export default Home;

const MainContainer = styled.main`
  width: 100%;
`;

const Container = styled.div`
  max-width: 990px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1``;

const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
`;

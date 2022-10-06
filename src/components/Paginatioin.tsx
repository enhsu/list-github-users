import { useRouter } from "next/router";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "~/store";
import { selectUsers, UserType } from "~/store/asyncData/slice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Pagination() {
  // const dispatch = useAppDispatch();
  const users: UserType[] = useAppSelector(selectUsers);
  const router = useRouter();
  const handleGetNext = () => {
    router.push(`/?since=${users[users.length - 1].id}`);
    // dispatch(fetchUsers(users[users.length - 1].id));
  };

  return (
    <Container>
      <PaginateItem onClick={() => handleGetNext()}>
        Get Next 20 users
        <ArrowForwardIosIcon />
      </PaginateItem>
    </Container>
  );
}

export default Pagination;

const Container = styled.div`
  margin-top: 2rem;
`;

const PaginateItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
  site_admin: boolean;
};

function SiteAdmin(props: PropsType) {
  const { site_admin } = props;
  return (
    <Container>
      Site admin {site_admin ? <CheckIcon /> : <CloseIcon />}
    </Container>
  );
}

export default SiteAdmin;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

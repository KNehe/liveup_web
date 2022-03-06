import { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getPatientsForRecep,
  resetPatient,
} from "../../features/patients/patientSlice";
import withAuth from "../../hoc/auth/withauth";
import Head from "next/head";
import RegisteredPatientsTable from "../../components/datatables/receptionist/patienttable";

const Index = () => {
  const { isError, message, isLoadingPatients, patients, isSuccess } =
    useSelector((state) => state.patient);

  const { authDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  useEffect(() => {
    dispatch(getPatientsForRecep(null));
  }, []);

  return (
    <>
      <Head>
        <title>{authDetails.user.username} | Receptionist</title>
      </Head>
      <div style={{ marginTop: "20vh" }}></div>
      <Container>
        {isLoadingPatients || !isSuccess ? (
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <RegisteredPatientsTable data={patients[0].results} />
        )}
      </Container>
    </>
  );
};

export default withAuth(Index);

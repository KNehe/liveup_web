import Head from "next/head";
import withAuth from "../../hoc/auth/withauth";
import AssignedPatientsTable from "../../components/datatables/clinician/assigned_patienttable";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Spinner, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { getAssignedPatients } from "../../features/patients/assigned_patientsSlice";
import { getClinicianStats } from "../../features/stats/statSlice";
import ClinicianStats from "../../components/stats/clinician";

const Index = () => {
  const { authDetails } = useSelector((state) => state.auth);

  const {
    assignedPatients,
    isLoadingPatients,
    isLoadingPatientsSuccess,
    message,
    isLoadingPatientsError,
  } = useSelector((state) => state.assigned);

  const { stats, isStatError, isStatSuccess, isStatLoading, statMessage } =
    useSelector((state) => state.stat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssignedPatients(null));
    dispatch(getClinicianStats())
  }, []);

  useEffect(() => {
    if (isLoadingPatientsError) {
      toast.error(message);
    }
  }, [isLoadingPatientsError, message]);
  return (
    <>
      <Head>
        <title>Clinician | {authDetails?.user?.username}</title>
      </Head>

      <div style={{ marginTop: "10vh" }}></div>

      <ClinicianStats stats={stats}/>

      <Container>
        {isLoadingPatients && !assignedPatients[0]?.results ? (
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <AssignedPatientsTable data={assignedPatients[0]?.results} />
        )}
      </Container>
    </>
  );
};

export default withAuth(Index);

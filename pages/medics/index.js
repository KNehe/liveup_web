import Head from "next/head";
import withAuth from "../../hoc/auth/withauth";
import AssignedPatientsTable from "../../components/datatables/clinician/assigned_patienttable";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Spinner, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAssignedPatients } from "../../features/patients/assigned_patientsSlice";
import { getClinicianStats } from "../../features/stats/statSlice";
import ClinicianStats from "../../components/stats/clinician";
import { setCurrentPageUri } from "../../features/pages/pageSlice";

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

  const { currentPageUri } = useSelector((state) => state.page);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("currentPageUri");
    dispatch(setCurrentPageUri(null));
    dispatch(getAssignedPatients(null));
    dispatch(getClinicianStats());
  }, []);

  useEffect(() => {
    if (isLoadingPatientsError) {
      toast.error(message);
    }
  }, [isLoadingPatientsError, message]);

  const handleSetCurrentPageUri = (e, currentPageUri) => {
    e.preventDefault();
    localStorage.setItem("currentPageUri", currentPageUri);
    dispatch(setCurrentPageUri(currentPageUri));
    dispatch(getAssignedPatients(currentPageUri));
  };

  return (
    <>
      <Head>
        <title>Clinician | {authDetails?.user?.username}</title>
      </Head>

      <div style={{ marginTop: "10vh" }}></div>

      {/* statistics */}
      <ClinicianStats stats={stats} />

      {/* assigned patients data table */}
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

      {/* pagination controls */}
      {isLoadingPatientsSuccess ? (
        <Container className="mt-2">
          <Row>
            <Col>
              <Button
                disabled={assignedPatients[0]?.previous ? false : true}
                variant="secondary"
                onClick={(e, uri) =>
                  handleSetCurrentPageUri(e, assignedPatients[0]?.previous)
                }
              >
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                disabled={assignedPatients[0]?.next ? false : true}
                variant="secondary"
                onClick={(e, uri) =>
                  handleSetCurrentPageUri(e, assignedPatients[0]?.next)
                }
              >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default withAuth(Index);

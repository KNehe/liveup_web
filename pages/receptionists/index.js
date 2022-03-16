import { useEffect, useState } from "react";
import { Container, Row, Spinner, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getPatientsForRecep,
  resetPatient,
} from "../../features/patients/patientSlice";
import withAuth from "../../hoc/auth/withauth";
import Head from "next/head";
import RegisteredPatientsTable from "../../components/datatables/receptionist/patienttable";
import { getReceptionistStats } from "../../features/stats/statSlice";
import ReceptionistStats from "../../components/stats/receptionist";
import { setCurrentPageUri } from "../../features/pages/pageSlice";

const Index = () => {
  const { isError, message, isLoadingPatients, patients, isSuccess } =
    useSelector((state) => state.patient);

  const { stats, isStatError, isStatSuccess, isStatLoading, statMessage } =
    useSelector((state) => state.stat);

  const { authDetails } = useSelector((state) => state.auth);

  const { currentPageUri } = useSelector((state) => state.page);

  const [isFirstPageLoad, setFirstPageLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  useEffect(() => {
    setFirstPageLoad(true);
    dispatch(setCurrentPageUri(null));
    localStorage.removeItem("currentPageUri");
    dispatch(getPatientsForRecep(currentPageUri));
    dispatch(getReceptionistStats());
    setFirstPageLoad(false);
  }, []);

  const handleSetCurrentPageUri = (e, currentPageUri) => {
    e.preventDefault();
    setFirstPageLoad(false);
    localStorage.setItem("currentPageUri", currentPageUri);
    dispatch(setCurrentPageUri(currentPageUri));
    dispatch(getPatientsForRecep(currentPageUri));
  };

  return (
    <>
      <Head>
        <title>{authDetails?.user?.username} | Receptionist</title>
      </Head>

      <div style={{ marginTop: "12vh" }}></div>

      {/* Statistics */}

      <ReceptionistStats stats={stats} />

      {/* Patient Data Table */}
      <>
        {isFirstPageLoad && isLoadingPatients || !isSuccess ? (
          <div
            style={{
              margin: "20vh auto",
              width: "50%",
              height: "50%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          <RegisteredPatientsTable data={patients[0]?.results} />
        )}

        {/* pagination controls */}
        {isSuccess ? (
          <Container className="mt-2">
            <Row>
              <Col>
                <Button
                  disabled={patients[0]?.previous ? false : true}
                  variant="secondary"
                  onClick={(e, uri) =>
                    handleSetCurrentPageUri(e, patients[0]?.previous)
                  }
                >
                  Previous
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={patients[0]?.next ? false : true}
                  variant="secondary"
                  onClick={(e, uri) =>
                    handleSetCurrentPageUri(e, patients[0]?.next)
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
    </>
  );
};

export default withAuth(Index);

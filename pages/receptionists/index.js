import { useEffect } from "react";
import { Container, Row, Spinner, Col, Card, Badge } from "react-bootstrap";
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

const Index = () => {
  const { isError, message, isLoadingPatients, patients, isSuccess } =
    useSelector((state) => state.patient);

  const { stats, isStatError, isStatSuccess, isStatLoading, statMessage } =
    useSelector((state) => state.stat);

  const { authDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  useEffect(() => {
    dispatch(getPatientsForRecep(null));
    dispatch(getReceptionistStats());
  }, []);

  return (
    <>
      <Head>
        <title>{authDetails?.user?.username} | Receptionist</title>
      </Head>

      <div style={{ marginTop: "12vh" }}></div>

      <ReceptionistStats stats={stats} />

      {/* Patient Data Table */}
      <>
        {isLoadingPatients || !isSuccess ? (
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <RegisteredPatientsTable data={patients[0]?.results} />
        )}
      </>
    </>
  );
};

export default withAuth(Index);

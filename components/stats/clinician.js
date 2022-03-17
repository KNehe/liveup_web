import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const ClinicianStats = ({ stats }) => {
  return (
    <Container className="mb-4">
      {/* referral stats */}
      <Row className="mb-2">
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.referrals || 0}</Badge>
            </h3>
            <h6>All Referrals</h6>
            <small>By all receptionists</small>
          </Card>
        </Col>

        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.referrals_to_user || 0}</Badge>
            </h3>
            <h6>Patients Referred</h6>
            <small>
              To you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.referrals_to_user / stats?.referrals) * 100
                ) || 0}
                %
              </Badge>
            </small>
          </Card>
        </Col>

        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.referrals_today_to_user || 0}</Badge>
            </h3>
            <h6>Referred Today</h6>
            <small>
              To you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.referrals_today_to_user / stats?.referrals_to_user) *
                    100
                ) || 0}
                %
              </Badge>
            </small>
          </Card>
        </Col>
      </Row>

{/* admission stats */}
      <Row>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.admissions || 0}</Badge>
            </h3>
            <h6>All Admissions</h6>
            <small>By all clinicians</small>
          </Card>
        </Col>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.admissions_by_user || 0}</Badge>
            </h3>
            <h6>Admissions</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.admissions_by_user / stats?.admissions) * 100
                ) || 0}{" "}
                %
              </Badge>
            </small>
          </Card>
        </Col>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.admissions_today_by_user || 0}</Badge>
            </h3>
            <h6>Admissions Today</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.admissions_today_by_user / stats?.admissions_by_user) *
                    100
                ) || 0}{" "}
                %
              </Badge>
            </small>
          </Card>
        </Col>
      </Row>

      {/*  prescription stats*/}
      <Row>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.prescriptions || 0}</Badge>
            </h3>
            <h6>All Prescriptions</h6>
            <small>By all clinicians</small>
          </Card>
        </Col>

        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.prescriptions_by_user || 0}</Badge>
            </h3>
            <h6>Prescriptions</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.prescriptions_by_user / stats?.prescriptions) * 100
                ) || 0}{" "}
                %
              </Badge>
            </small>
          </Card>
        </Col>
        
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.prescriptions_today_by_user || 0}</Badge>
            </h3>
            <h6>Prescriptions Today</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.prescriptions_today_by_user / stats?.prescriptions_by_user) *
                    100
                ) || 0}{" "}
                %
              </Badge>
            </small>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClinicianStats;

import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const ReceptionistStats = ({ stats }) => {
  return (
    <Container className="mb-4">
      {/* Receptionist stats */}
      <Row className="mb-2">
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.patients || 0}</Badge>
            </h3>
            <h6>Patients Registered</h6>
            <small>By all receptionists</small>
          </Card>
        </Col>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.patients_by_user || 0}</Badge>
            </h3>
            <h6>Patients Registered</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.patients_by_user / stats?.patients) * 100
                ) || 0}
                %
              </Badge>
            </small>
          </Card>
        </Col>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.patients_today_by_user || 0}</Badge>
            </h3>
            <h6>Registered Today</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.patients_today_by_user / stats?.patients_by_user) *
                    100
                ) || 0}
                %
              </Badge>
            </small>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.referrals || 0}</Badge>
            </h3>
            <h6>Patients Referred</h6>
            <small>By all receptionists</small>
          </Card>
        </Col>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.referrals_by_user || 0}</Badge>
            </h3>
            <h6>Patients Referred</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.referrals_by_user / stats?.referrals) * 100
                ) || 0}{" "}
                %
              </Badge>
            </small>
          </Card>
        </Col>
        <Col>
          <Card className="p-2 mb-2 d-flex align-items-center">
            <h3>
              <Badge bg="success">{stats?.referrals_today_by_user || 0}</Badge>
            </h3>
            <h6>Referred Today</h6>
            <small>
              By you &nbsp;
              <Badge bg="dark">
                {Math.trunc(
                  (stats?.referrals_today_by_user / stats?.referrals_by_user) *
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

export default ReceptionistStats;

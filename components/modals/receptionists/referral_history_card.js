import { Button, Row, Card } from "react-bootstrap";

const ReferralHistoryCard = ({ item, authDetails, onEditBtnClick}) => {
  return (
    <Card className="mt-2 p-3">
      <Row>
        <p>
          <b>Patient Number: </b>
          {item?.patient?.patient_number}
        </p>

        <p>
          <b>Status: </b>
          {item?.status}
        </p>

        <p>
          <b>Referred To: </b>
          {item?.doctor?.first_name}{" "}
          {item?.doctor?.last_name} 
        </p>
        <p>
          <b>ROLE: </b>
          {item?.doctor?.role}
        </p>

        <p>
          <b>Referred By: </b>
          {item?.created_by?.first_name} {item?.created_by?.last_name}
        </p>

        <p>
          <b>Referred On: </b>
          {new Date(item?.created_at).toLocaleDateString()}{" "}
          {new Date(item?.created_at).toLocaleTimeString()}
        </p>

        <p>
          <b>Last Updated By: </b>
          {item?.updated_by ? (
            <>
              {item?.updated_by?.first_name} {item?.updated_by?.last_name}
            </>
          ) : (
            "Not updated yet!"
          )}
        </p>

        <p>
          <b>Last Updated On: </b>
          {item?.updated_at ? (
            <>
              {new Date(item?.updated_at).toLocaleDateString()}{" "}
              {new Date(item?.updated_at).toLocaleTimeString()}
            </>
          ) : (
            "Not updated yet!"
          )}
        </p>
        {authDetails?.user?.email === item?.created_by?.email ? (
          <p>
            <Button onClick={(e, i) => onEditBtnClick(e, item)}>Edit</Button>
          </p>
        ) : (
          ""
        )}
      </Row>
    </Card>
  );
};

export default ReferralHistoryCard;

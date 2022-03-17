import { Button, Row, Card } from "react-bootstrap";

const AdmissionHistoryCard = ({ item, authDetails, onEditBtnClick }) => {

  return (
    <Row>
      <Card className="mt-2">
        <p>
          <b>Ward: </b>
          {item?.ward.name}
        </p>
        <p>
          <b>Admission Date and Time: </b>
          {new Date(item?.created_at).toLocaleDateString()}{" "}
          {new Date(item?.created_at).toLocaleTimeString()}
        </p>
        <p>
          <b>Admitted by: </b>
          {item?.created_by.first_name} {item?.created_by.last_name}
        </p>
        <p>
          <b>Role: </b>
          {item?.created_by.role}
        </p>
        <p>
          {" "}
          <b>Last Updated By:</b>{" "}
          {item.updated_by ? (
            <>
              {item?.updated_by.first_name} {item?.updated_by.last_name}
            </>
          ) : (
            "Not updated"
          )}
        </p>
        <p>
          <b>Date and Time Updated:</b>{" "}
          {item?.updated_at ? (
            <>
              {new Date(item?.updated_at).toLocaleDateString()}{" "}
              {new Date(item?.updated_at).toLocaleTimeString()}
            </>
          ) : (
            "Not updated"
          )}
        </p>

        {item.created_by.email === authDetails.user.email ? (
          <p>
            <Button variant="success" onClick={(e, d) => onEditBtnClick(e, item)}>Edit</Button>
          </p>
        ) : (
          ""
        )}
      </Card>
    </Row>
  );
};

export default AdmissionHistoryCard;

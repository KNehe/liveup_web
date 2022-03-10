import { Button, Row, Card } from "react-bootstrap";

const PrescriptionCard = ({ item, authDetails }) => {
  return (
    <Row>
      <Card className="p-4 mt-2">
        <p>
          <b>Description: </b>
          {item?.description}
        </p>

        <p>
          <b>Precirbed by: </b>
          {item?.created_by?.first_name} {item?.created_by?.last_name}
        </p>

        <p>
          <b>Role: </b>
          {item?.created_by?.role}
        </p>

        <p>
          <b>Start Date and Time: </b>{" "}
          {new Date(item?.start_datetime).toLocaleDateString()}
          &nbsp;{new Date(item?.start_datetime).toLocaleTimeString()}
        </p>

        <p>
          <b>End Date and Time: </b>{" "}
          {new Date(item?.end_datetime).toLocaleDateString()}
          &nbsp;{new Date(item?.end_datetime).toLocaleTimeString()}
        </p>

        <p>
          <b>Date and Time recorded: </b>{" "}
          {new Date(item?.created_at).toLocaleDateString()}
          &nbsp;{new Date(item?.created_at).toLocaleTimeString()}
        </p>

        <p>
          <b>Last updated by: </b>{" "}
          {item?.updated_by ? (
            <>
              {new Date(item?.updated_by?.first_name).toLocaleDateString()}{" "}
              {new Date(item?.updated_at?.last_name).toLocaleTimeString()}
            </>
          ) : (
            "Not updated yet"
          )}
        </p>
        <p>
          <b>Date and Time updated: </b>
          {item?.updated_at ? (
            <>
              {new Date(item?.updated_at).toLocaleDateString()}{" "}
              {new Date(item?.updated_at).toLocaleTimeString()}
            </>
          ) : (
            "Not updated yet"
          )}
        </p>

        {item.created_by.email === authDetails.user.email ? (
          <p>
            <Button variant="success">Edit</Button>
          </p>
        ) : (
          ""
        )}
      </Card>
    </Row>
  );
};

export default PrescriptionCard;

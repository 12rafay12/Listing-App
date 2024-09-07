import React, { useState, useEffect } from "react";
import { useGetCardsQuery } from "../../Redux/Slices/CardSlice";
import { Button, Card, Col, Row, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDeleteCardMutation } from "../../Redux/Slices/CardSlice";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import DeatilsModal from "./DeatilsModal";
import "./List.css";

const List = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dataID, setDataID] = useState();

  const { data, isLoading } = useGetCardsQuery();
  const [
    deleteCardMutation,
    { isLoading: delCardLoading, isSuccess: delCardSuccess },
  ] = useDeleteCardMutation();

  const handleEdit = (id) => {
    navigate(`/Listing-App/form/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCardMutation(id);
      setShowModal(false);
    } catch (error) {
      console.log("Error while deleting", error);
    }
  };
  useEffect(() => {
    if (delCardSuccess) {
      setShowModal(false);
    }
  }, [delCardSuccess]);

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
  };

  const menu = (id) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEdit(id)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDelete(id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="spinContainer">
        {(isLoading || delCardLoading) && <Spin size="large" />}
      </div>
      {!delCardLoading && (
        <div className="cardsContainer">
          <DeatilsModal
            id={dataID}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <Row gutter={[32, 32]}>
            {data &&
              data.map((value) => (
                <Col key={value.id} xs={24} sm={24} md={12} lg={8} xl={6}>
                  <Card
                    title={value.name}
                    bordered={false}
                    style={{
                      width: 300,
                    }}
                    onClick={() => {
                      setShowModal(true);
                      setDataID(value.id);
                    }}
                    extra={
                      <Dropdown overlay={menu(value.id)} trigger={["click"]}>
                        <Button
                          icon={<MoreOutlined />}
                          className="more-button"
                          style={{ border: "none", background: "transparent" }}
                          onClick={handleMenuClick}
                        />
                      </Dropdown>
                    }
                  >
                    <p className="single-line">Country: {value.country}</p>
                    <p>
                      Gender:{" "}
                      {value.gender.charAt(0).toUpperCase() +
                        value.gender.slice(1)}
                    </p>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default List;

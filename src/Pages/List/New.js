import React, { useEffect } from "react";
import "./List.css";
import { Button, Form, Input, Row, Col, message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useLazyGetCardQuery,
  useEditCardMutation,
  useAddCardMutation,
} from "../../Redux/Slices/CardSlice";

const New = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [fetchCard, { data, isLoading: fetching }] = useLazyGetCardQuery();
  const [editCard, { isLoading: editing }] = useEditCardMutation();
  const [addCard, { isLoading: adding }] = useAddCardMutation();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      fetchCard(id);
    } else {
      setEditMode(false);
      form.resetFields();
    }
  }, [id]);

  useEffect(() => {
    if (editMode && data) {
      form.setFieldsValue({
        name: data.name,
        country: data.country,
        state: data.state,
        city: data.city,
        gender: data.gender,
      });
    }
  }, [editMode, data]);

  const handleSubmit = async (values) => {
    try {
      if (editMode) {
        await editCard({ id, ...values }).unwrap();
        message.success("Card updated successfully");
      } else {
        await addCard(values).unwrap();
        message.success("Card added successfully");
      }
      navigate("/"); // Redirect after submission
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="cardsContainer">
      <Spin spinning={editMode && fetching}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please enter country!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please enter state!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter city!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please enter gender!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={adding || editing}
            >
              {editMode ? "Update" : "Add"} Card
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default New;

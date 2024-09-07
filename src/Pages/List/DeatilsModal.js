import React from "react";
import { Modal, Typography } from "antd";
import { useLazyGetCardQuery } from "../../Redux/Slices/CardSlice";
import { useEffect } from "react";
const { Paragraph } = Typography;
const DeatilsModal = ({ id, showModal, setShowModal }) => {
  const [fetchCard, { data, isLoading }] = useLazyGetCardQuery();
  useEffect(() => {
    if (id && showModal) {
      fetchCard(id);
    }
  }, [id, showModal]);
  console.log("id", id);

  return (
    <Modal
      title={<p>Detailed View</p>}
      loading={isLoading}
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={null}
    >
      <>
        <Paragraph>
          <strong>ID:</strong> {data?.id}
        </Paragraph>
        <Paragraph>
          <strong>Name:</strong> {data?.name}
        </Paragraph>
        <Paragraph>
          <strong>Country:</strong> {data?.country}
        </Paragraph>
        <Paragraph>
          <strong>Country:</strong> {data?.state}
        </Paragraph>
        <Paragraph>
          <strong>Country:</strong> {data?.city}
        </Paragraph>
        <Paragraph>
          <strong>Gender:</strong>{" "}
          {data?.gender.charAt(0).toUpperCase() + data?.gender.slice(1)}
        </Paragraph>
      </>
    </Modal>
  );
};

export default DeatilsModal;

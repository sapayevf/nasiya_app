import { Modal, Form, Input, Button, message } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";

const AddDebtorModal = ({ isOpen, onClose, onAddDebtor }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Format phone number to match API requirements
      const phoneNumber = values.phone_number.startsWith("+")
        ? values.phone_number
        : `+${values.phone_number}`;

      // Format the data according to API requirements
      const formData = {
        full_name: values.full_name,
        phone_numbers: [
          {
            number: phoneNumber,
            is_primary: true,
            type: "mobile", // Adding required type field
          },
        ],
        passport: values.passport || null,
        address: values.address || null,
        description: values.description || null,
      };

      await onAddDebtor(formData);
      form.resetFields();
    } catch (error) {
      message.error("Mijozni qo'shishda xatolik yuz berdi");
    }
  };

  return (
    <Modal
      title="Yangi mijoz qo'shish"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          phone_number: "+998",
        }}
      >
        <Form.Item
          name="full_name"
          label="Ism familiya"
          rules={[
            { required: true, message: "Iltimos, ismni kiriting" },
            {
              min: 3,
              message: "Ism kamida 3 ta belgidan iborat bo'lishi kerak",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Ism familiyani kiriting"
          />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Telefon raqami"
          rules={[
            { required: true, message: "Iltimos, telefon raqamini kiriting" },
            {
              pattern: /^\+998\d{9}$/,
              message:
                "Telefon raqamini to'g'ri formatda kiriting: +998XXXXXXXXX",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="+998" />
        </Form.Item>

        <Form.Item name="passport" label="Passport">
          <Input placeholder="AA1234567" />
        </Form.Item>

        <Form.Item name="address" label="Manzil">
          <Input placeholder="Manzilni kiriting" />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea placeholder="Qo'shimcha ma'lumot" rows={3} />
        </Form.Item>

        <Form.Item className="form-buttons">
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDebtorModal;

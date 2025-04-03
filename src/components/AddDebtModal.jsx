import {
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDebt } from "../hooks/useDebt";
import dayjs from "dayjs";

const AddDebtModal = ({ isOpen, onClose, debtorId, onSuccess }) => {
  const [form] = Form.useForm();
  const { addDebt, loading } = useDebt();

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        next_payment_date: dayjs(values.next_payment_date).format("YYYY-MM-DD"),
        debt_period: values.debt_period,
        debt_sum: values.debt_sum,
        total_debt_sum: values.total_debt_sum,
        description: values.description,
        debtor: debtorId,
        debt_status: "active",
        images:
          values.images?.fileList?.map((file) => file.originFileObj) || [],
      };

      await addDebt(formattedValues);
      message.success("Nasiya muvaffaqiyatli qo'shildi!");
      form.resetFields();
      onSuccess?.();
      onClose();
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Yangi nasiya qo'shish"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="debt_sum"
          label="Nasiya summasi"
          rules={[
            { required: true, message: "Iltimos, nasiya summasini kiriting" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Nasiya summasini kiriting"
          />
        </Form.Item>

        <Form.Item
          name="total_debt_sum"
          label="Jami nasiya summasi"
          rules={[
            {
              required: true,
              message: "Iltimos, jami nasiya summasini kiriting",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Jami nasiya summasini kiriting"
          />
        </Form.Item>

        <Form.Item
          name="debt_period"
          label="Nasiya muddati (oyda)"
          rules={[
            { required: true, message: "Iltimos, nasiya muddatini kiriting" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder="Nasiya muddatini kiriting"
          />
        </Form.Item>

        <Form.Item
          name="next_payment_date"
          label="Keyingi to'lov sanasi"
          rules={[
            {
              required: true,
              message: "Iltimos, keyingi to'lov sanasini kiriting",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            placeholder="Sanani tanlang"
          />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Qo'shimcha ma'lumot" />
        </Form.Item>

        <Form.Item name="images" label="Rasmlar">
          <Upload listType="picture" multiple beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Rasmlarni yuklash</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="form-buttons">
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDebtModal;

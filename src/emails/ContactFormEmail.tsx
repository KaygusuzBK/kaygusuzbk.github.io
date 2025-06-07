import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import { Tailwind } from '@react-email/components';

type ContactFormEmailProps = {
  senderEmail: string;
  message: string;
};

export const ContactFormEmail = ({
  senderEmail,
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Portfolyo Sitenizden Yeni Mesaj</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Portfolyo siteniz üzerinden yeni bir mesaj aldınız
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>Gönderenin E-posta adresi: {senderEmail}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail; 
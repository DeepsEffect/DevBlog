import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

export const RightSidebar = () => {
  const [clockValue, setClockValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setClockValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-center mx-auto">
            Activity bar
          </h2>
        </CardHeader>
        <CardBody className="flex justify-center items-center gap-4 mx-auto">
          <Clock
            secondHandOppositeLength={15}
            secondHandWidth={2}
            value={clockValue}
          />
        </CardBody>
      </Card>
    </div>
  );
};

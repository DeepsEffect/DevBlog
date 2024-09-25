import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

export const RightSidebar = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Recent Activity</h2>
        </CardHeader>
        <CardBody>
          <p>Recommended topics will be shown here</p>
          <p>recently saved will be shown here</p>
        </CardBody>
        <CardHeader>
          <p>recent comments will be show here</p>
        </CardHeader>
        <CardFooter>other banners will be shown here</CardFooter>
      </Card>
    </div>
  );
};

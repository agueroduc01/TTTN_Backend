Dưới đây là một ví dụ về dữ liệu mẫu của các bảng trong hệ thống của bạn:

Bảng "Managers":

| ManagerID | Name         | Email            | Password |
| --------- | ------------ | ---------------- | -------- |
| 1         | John Smith   | john@example.com | 123456   |
| 2         | Emma Johnson | emma@example.com | abcdef   |

Bảng "Employees":

| EmployeeID | Name           | Email               | Password  |
| ---------- | -------------- | ------------------- | --------- |
| 1001       | Michael Brown  | michael@example.com | password1 |
| 1002       | Sarah Davis    | sarah@example.com   | password2 |
| 1003       | Robert Johnson | robert@example.com  | password3 |
| 1004       | Emily Wilson   | emily@example.com   | password4 |

Bảng "BusinessTrips":

| TripID | Destination   | Content           | Partner          | Schedule                 |
| ------ | ------------- | ----------------- | ---------------- | ------------------------ |
| 101    | New York      | Client meeting    | ABC Corporation  | 2023-07-10 to 2023-07-12 |
| 102    | London        | Site inspection   | XYZ Construction | 2023-08-05 to 2023-08-07 |
| 103    | San Francisco | Training workshop | XYZ Company      | 2023-09-15 to 2023-09-17 |

Bảng "Assignments":

| AssignmentID | TripID | EmployeeID | Task         | ExpectedResult                 |
| ------------ | ------ | ---------- | ------------ | ------------------------------ |
| 1            | 101    | 1001       | Presentation | Prepare presentation slides    |
| 2            | 101    | 1002       | Research     | Collect market data            |
| 3            | 102    | 1001       | Inspection   | Evaluate construction progress |
| 4            | 103    | 1003       | Training     | Conduct employee training      |

Bảng "Reports":

| ReportID | TripID | EmployeeID | ReportContent               | ReportDate |
| -------- | ------ | ---------- | --------------------------- | ---------- |
| 1        | 101    | 1001       | Presentation went well      | 2023-07-12 |
| 2        | 101    | 1002       | Completed market research   | 2023-07-12 |
| 3        | 102    | 1001       | Progress is on track        | 2023-08-07 |
| 4        | 103    | 1003       | Training session successful | 2023-09-17 |

Bảng "Evidence":

| EvidenceID | ReportID | EvidenceType        | EvidenceDescription                 |
| ---------- | -------- | ------------------- | ----------------------------------- |
| 1          | 1        | Google Map Location | Coordinates: 40.7128° N, 74.0060° W |
| 2          | 2        | Photo               | [Link to photo]                     |
| 3          | 3        | Google Map Location | Coordinates: 51.5074° N, 0.1278° W  |
| 4          | 4        | Photo               | [Link to photo]                     |

Trong ví dụ trên, chúng ta có dữ liệu mẫu cho các

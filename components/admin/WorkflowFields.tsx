import type {StaffRole} from "../../lib/admin/auth";

const adminStatuses=[
  ["draft","Draft"],
  ["review","Review"],
  ["approved","Approved"],
  ["scheduled","Scheduled"],
  ["published","Published"],
  ["rejected","Rejected"]
];

const editorStatuses=[
  ["draft","Draft"],
  ["review","Submit for Review"]
];

export default function WorkflowFields({
  role,
  status="draft",
  scheduledFor=""
}:{
  role:StaffRole;
  status?:string;
  scheduledFor?:string|null;
}){
  const options=role==="admin"?adminStatuses:editorStatuses;

  return <div className="workflowFieldsV18">
    <label>
      حیثیت
      <select name="status" defaultValue={options.some(x=>x[0]===status)?status:"draft"}>
        {options.map(([value,label])=><option value={value} key={value}>{label}</option>)}
      </select>
    </label>

    {role==="admin"&&<label>
      شیڈول تاریخ و وقت
      <input
        type="datetime-local"
        name="scheduled_for"
        defaultValue={scheduledFor?new Date(scheduledFor).toISOString().slice(0,16):""}
      />
    </label>}
  </div>
}

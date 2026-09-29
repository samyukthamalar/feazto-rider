/**
 * FEAzTO Rider - Workflow Navigator (Disabled for Production App UI)
 * Kept as a no-op placeholder component so existing references safely render nothing.
 */

import React from 'react';

interface WorkflowBarProps {
  currentStep?: number;
}

export const WorkflowBar: React.FC<WorkflowBarProps> = () => null;

export default WorkflowBar;

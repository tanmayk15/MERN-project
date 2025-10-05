const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [200, 'Project name cannot exceed 200 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'],
      message: '{VALUE} is not a valid department'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: {
      values: ['Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Gurugram', 'Noida', 'Nagpur', 'Wardha'],
      message: '{VALUE} is not a valid location'
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        // 'this' refers to the document being validated
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['Registered', 'Running', 'Closed', 'Cancelled'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Registered'
  },
  manager: {
    type: String,
    required: [true, 'Manager is required'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Indexes for better query performance
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ department: 1 });
ProjectSchema.index({ endDate: 1 });
ProjectSchema.index({ createdAt: -1 });

// Text index for search functionality
ProjectSchema.index({
  projectName: 'text',
  location: 'text',
  manager: 'text',
  description: 'text'
});

// Virtual for checking if project is delayed
ProjectSchema.virtual('isDelayed').get(function() {
  return this.status === 'Running' && new Date() > this.endDate;
});

// Virtual for project duration in days
ProjectSchema.virtual('durationInDays').get(function() {
  const timeDiff = this.endDate.getTime() - this.startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

// Ensure virtual fields are serialized
ProjectSchema.set('toJSON', { virtuals: true });
ProjectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Project', ProjectSchema);
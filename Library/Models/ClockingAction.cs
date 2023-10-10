using System.ComponentModel.DataAnnotations;
using VewTech.AutoTime.Library.Enums;

namespace VewTech.AutoTime.Library.Models;

/// <summary>
/// Clocking actions represent each individual
/// action a Schedule will perform.
/// </summary>
public class ClockingAction
{
    /// <summary>
    /// The unique Guid of the ClockingAction.
    /// </summary>
    [Required]
    public Guid IdClocking { get; set; }

    /// <summary>
    /// The time at which the action will be performed.
    /// </summary>
    [Required]
    public TimeOnly ScheduledTime { get; set; }

    /// <summary>
    /// The action that will be performed.
    /// See the docs at https://apidocs.intratime.es/
    /// </summary>
    [Required]
    public ActionType Action { get; set; }
}